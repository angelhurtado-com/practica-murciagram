import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Exact Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKGC0aeAxxhSxdKsw-dAEl8CPvtD2Qk_g",
    authDomain: "practica-murciagram.firebaseapp.com",
    projectId: "practica-murciagram",
    storageBucket: "practica-murciagram.firebasestorage.app",
    messagingSenderId: "624086172772",
    appId: "1:624086172772:web:711ec8f32ca93565eccb71"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Validation Regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// DOM Elements
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const authAlert = document.getElementById("auth-alert");

// Helper to show general alerts
function showAlert(message, type = "error") {
    if (!authAlert) return;
    authAlert.className = `auth-alert ${type}`;
    const icon = type === "error" ? "fa-circle-exclamation" : "fa-circle-check";
    authAlert.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    authAlert.style.display = "flex";
}

function hideAlert() {
    if (!authAlert) return;
    authAlert.style.display = "none";
    authAlert.innerHTML = "";
}

// Helper to set field validity state
function setFieldStatus(input, errorElement, isValid, errorMessage = "") {
    if (!input) return;
    if (isValid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        if (errorElement) errorElement.textContent = "";
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        if (errorElement) errorElement.textContent = errorMessage;
    }
}

// Password toggle functionality
document.querySelectorAll(".toggle-password").forEach((toggleBtn) => {
    toggleBtn.addEventListener("click", () => {
        const inputWrapper = toggleBtn.closest(".input-wrapper");
        const passwordInput = inputWrapper ? inputWrapper.querySelector("input") : null;
        const icon = toggleBtn.querySelector("i");

        if (passwordInput && icon) {
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";
            icon.classList.toggle("fa-eye", !isPassword);
            icon.classList.toggle("fa-eye-slash", isPassword);
        }
    });
});

// Translate Firebase Errors
function translateFirebaseError(code) {
    switch (code) {
        case "auth/invalid-credential":
            return "Las credenciales introducidas no son válidas. Revisa el correo y la contraseña.";
        case "auth/user-not-found":
            return "No existe ninguna cuenta asociada a este correo electrónico.";
        case "auth/wrong-password":
            return "La contraseña introducida es incorrecta.";
        case "auth/email-already-in-use":
            return "El correo electrónico ya está registrado. Inicia sesión o utiliza otro correo.";
        case "auth/too-many-requests":
            return "Demasiados intentos fallidos. Inténtalo de nuevo más tarde.";
        case "auth/invalid-email":
            return "El formato del correo electrónico no es válido.";
        case "auth/weak-password":
            return "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.";
        default:
            return "Ha ocurrido un error en la autenticación. Por favor, inténtalo de nuevo.";
    }
}

// ----------------------------------------------------
// REGISTRATION FLOW (registro.html)
// ----------------------------------------------------
if (registerForm) {
    const nombreInput = document.getElementById("nombre");
    const apellidosInput = document.getElementById("apellidos");
    const emailInput = document.getElementById("email");
    const fechaNacimientoInput = document.getElementById("fechaNacimiento");
    const direccionInput = document.getElementById("direccion");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const aceptoPrivacidadCheckbox = document.getElementById("aceptoPrivacidad");
    const btnSubmit = document.getElementById("btn-submit");

    const errorNombre = document.getElementById("error-nombre");
    const errorApellidos = document.getElementById("error-apellidos");
    const errorEmail = document.getElementById("error-email");
    const errorFechaNacimiento = document.getElementById("error-fechaNacimiento");
    const errorDireccion = document.getElementById("error-direccion");
    const errorPassword = document.getElementById("error-password");
    const errorConfirmPassword = document.getElementById("error-confirmPassword");
    const errorAceptoPrivacidad = document.getElementById("error-aceptoPrivacidad");

    function validateRegisterField(fieldId) {
        let isFieldValid = true;

        if (fieldId === "nombre") {
            const val = nombreInput.value.trim();
            if (!val) {
                setFieldStatus(nombreInput, errorNombre, false, "El nombre es obligatorio.");
                isFieldValid = false;
            } else {
                setFieldStatus(nombreInput, errorNombre, true);
            }
        }

        if (fieldId === "apellidos") {
            const val = apellidosInput.value.trim();
            if (!val) {
                setFieldStatus(apellidosInput, errorApellidos, false, "Los apellidos son obligatorios.");
                isFieldValid = false;
            } else {
                setFieldStatus(apellidosInput, errorApellidos, true);
            }
        }

        if (fieldId === "email") {
            const val = emailInput.value.trim();
            if (!val) {
                setFieldStatus(emailInput, errorEmail, false, "El correo electrónico es obligatorio.");
                isFieldValid = false;
            } else if (!EMAIL_REGEX.test(val)) {
                setFieldStatus(emailInput, errorEmail, false, "Introduce un correo electrónico válido.");
                isFieldValid = false;
            } else {
                setFieldStatus(emailInput, errorEmail, true);
            }
        }

        if (fieldId === "fechaNacimiento") {
            const val = fechaNacimientoInput.value;
            if (!val) {
                setFieldStatus(fechaNacimientoInput, errorFechaNacimiento, false, "La fecha de nacimiento es obligatoria.");
                isFieldValid = false;
            } else {
                setFieldStatus(fechaNacimientoInput, errorFechaNacimiento, true);
            }
        }

        if (fieldId === "direccion") {
            const val = direccionInput.value.trim();
            if (!val) {
                setFieldStatus(direccionInput, errorDireccion, false, "La dirección postal es obligatoria.");
                isFieldValid = false;
            } else {
                setFieldStatus(direccionInput, errorDireccion, true);
            }
        }

        if (fieldId === "password") {
            const val = passwordInput.value;
            if (!val) {
                setFieldStatus(passwordInput, errorPassword, false, "La contraseña es obligatoria.");
                isFieldValid = false;
            } else if (val.length < 6) {
                setFieldStatus(passwordInput, errorPassword, false, "La contraseña debe tener al menos 6 caracteres.");
                isFieldValid = false;
            } else {
                setFieldStatus(passwordInput, errorPassword, true);
            }
            if (confirmPasswordInput.value) {
                validateRegisterField("confirmPassword");
            }
        }

        if (fieldId === "confirmPassword") {
            const val = confirmPasswordInput.value;
            const passVal = passwordInput.value;
            if (!val) {
                setFieldStatus(confirmPasswordInput, errorConfirmPassword, false, "Debes repetir la contraseña.");
                isFieldValid = false;
            } else if (val !== passVal) {
                setFieldStatus(confirmPasswordInput, errorConfirmPassword, false, "Las contraseñas no coinciden.");
                isFieldValid = false;
            } else if (val.length < 6) {
                setFieldStatus(confirmPasswordInput, errorConfirmPassword, false, "La contraseña debe tener al menos 6 caracteres.");
                isFieldValid = false;
            } else {
                setFieldStatus(confirmPasswordInput, errorConfirmPassword, true);
            }
        }

        if (fieldId === "aceptoPrivacidad") {
            if (!aceptoPrivacidadCheckbox.checked) {
                if (errorAceptoPrivacidad) errorAceptoPrivacidad.textContent = "Debes aceptar las condiciones de privacidad.";
                isFieldValid = false;
            } else {
                if (errorAceptoPrivacidad) errorAceptoPrivacidad.textContent = "";
            }
        }

        return isFieldValid;
    }

    function validateAllRegisterFields() {
        const fields = ["nombre", "apellidos", "email", "fechaNacimiento", "direccion", "password", "confirmPassword", "aceptoPrivacidad"];
        let valid = true;
        fields.forEach((f) => {
            if (!validateRegisterField(f)) valid = false;
        });
        return valid;
    }

    // Live validation on blur
    [nombreInput, apellidosInput, emailInput, fechaNacimientoInput, direccionInput, passwordInput, confirmPasswordInput].forEach((input) => {
        if (!input) return;
        input.addEventListener("blur", () => {
            validateRegisterField(input.id);
        });
    });

    if (aceptoPrivacidadCheckbox) {
        aceptoPrivacidadCheckbox.addEventListener("change", () => {
            validateRegisterField("aceptoPrivacidad");
        });
    }

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideAlert();

        if (!validateAllRegisterFields()) {
            showAlert("Por favor, corrige los errores señalados en el formulario.");
            return;
        }

        const nombre = nombreInput.value.trim();
        const apellidos = apellidosInput.value.trim();
        const email = emailInput.value.trim();
        const fechaNacimiento = fechaNacimientoInput.value;
        const direccion = direccionInput.value.trim();
        const password = passwordInput.value;

        try {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Registrando...`;

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                nombre,
                apellidos,
                email,
                fechaNacimiento,
                direccion,
                fechaRegistro: serverTimestamp()
            });

            await addDoc(collection(db, "accesos"), {
                uid: user.uid,
                email: user.email,
                tipo: "registro",
                fechaHora: serverTimestamp()
            });

            showAlert("¡Registro completado con éxito! Redirigiendo...", "success");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);

        } catch (error) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = `<i class="fa-solid fa-user-plus"></i> Registrarse`;
            showAlert(translateFirebaseError(error.code));
        }
    });
}

// ----------------------------------------------------
// LOGIN FLOW (login.html)
// ----------------------------------------------------
if (loginForm) {
    const loginEmailInput = document.getElementById("loginEmail");
    const loginPasswordInput = document.getElementById("loginPassword");
    const btnSubmit = document.getElementById("btn-submit");

    const errorLoginEmail = document.getElementById("error-loginEmail");
    const errorLoginPassword = document.getElementById("error-loginPassword");

    function validateLoginField(fieldId) {
        let isFieldValid = true;

        if (fieldId === "loginEmail") {
            const val = loginEmailInput.value.trim();
            if (!val) {
                setFieldStatus(loginEmailInput, errorLoginEmail, false, "El correo electrónico es obligatorio.");
                isFieldValid = false;
            } else if (!EMAIL_REGEX.test(val)) {
                setFieldStatus(loginEmailInput, errorLoginEmail, false, "Introduce un correo electrónico válido.");
                isFieldValid = false;
            } else {
                setFieldStatus(loginEmailInput, errorLoginEmail, true);
            }
        }

        if (fieldId === "loginPassword") {
            const val = loginPasswordInput.value;
            if (!val) {
                setFieldStatus(loginPasswordInput, errorLoginPassword, false, "La contraseña es obligatoria.");
                isFieldValid = false;
            } else if (val.length < 6) {
                setFieldStatus(loginPasswordInput, errorLoginPassword, false, "La contraseña debe tener al menos 6 caracteres.");
                isFieldValid = false;
            } else {
                setFieldStatus(loginPasswordInput, errorLoginPassword, true);
            }
        }

        return isFieldValid;
    }

    function validateAllLoginFields() {
        const fields = ["loginEmail", "loginPassword"];
        let valid = true;
        fields.forEach((f) => {
            if (!validateLoginField(f)) valid = false;
        });
        return valid;
    }

    [loginEmailInput, loginPasswordInput].forEach((input) => {
        if (!input) return;
        input.addEventListener("blur", () => {
            validateLoginField(input.id);
        });
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        hideAlert();

        if (!validateAllLoginFields()) {
            showAlert("Por favor, introduce las credenciales válidas.");
            return;
        }

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value;

        try {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Iniciando sesión...`;

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await addDoc(collection(db, "accesos"), {
                uid: user.uid,
                email: user.email,
                tipo: "login",
                fechaHora: serverTimestamp()
            });

            showAlert("¡Inicio de sesión correcto! Redirigiendo...", "success");

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);

        } catch (error) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Iniciar Sesión`;
            showAlert(translateFirebaseError(error.code));
        }
    });
}