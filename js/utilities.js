/* ============================================
   UTILIDADES Y HELPERS
   ============================================ */

// Objeto de configuración global
const Config = {
    siteName: 'Club Finanzas Extremadura',
    email: 'clubfinanzasext@cfeexes.com',
    phone: '+34 612 345 678',
    socialLinks: {
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        facebook: 'https://facebook.com'
    }
};

// API Helper - Para futuras integraciones con backend
class APIHelper {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
    }

    async submitAdmission(formData) {
        try {
            const response = await fetch(`${this.baseURL}/admission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error en submisión de admisión:', error);
            throw error;
        }
    }

    async submitContact(formData) {
        try {
            const response = await fetch(`${this.baseURL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error en submisión de contacto:', error);
            throw error;
        }
    }

    async getEvents() {
        try {
            const response = await fetch(`${this.baseURL}/events`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            return [];
        }
    }

    async getResources() {
        try {
            const response = await fetch(`${this.baseURL}/resources`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo recursos:', error);
            return [];
        }
    }
}

// Validador de Formularios
class FormValidator {
    static validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static validateName(name) {
        return name.trim().length >= 3;
    }

    static validatePhone(phone) {
        const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
        return regex.test(phone);
    }

    static validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    static validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#ecf0f1';
            }
        });

        return isValid;
    }
}

// Utilidades de Tiempo
class TimeUtils {
    static formatDate(date, format = 'es-ES') {
        return new Intl.DateTimeFormat(format, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }

    static getTimeAgo(date) {
        const now = new Date();
        const past = new Date(date);
        const diff = now - past;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
        if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        return 'hace unos segundos';
    }

    static getCountdown(date) {
        const now = new Date();
        const event = new Date(date);
        const diff = event - now;

        if (diff <= 0) return 'Evento finalizado';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);

        return `${days}d ${hours}h ${minutes}m`;
    }
}

// Gestor de LocalStorage
class StorageManager {
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
        }
    }

    static getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error leyendo de localStorage:', error);
            return null;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error limpiando localStorage:', error);
        }
    }
}

// Gestor de Preferencias de Usuario
class UserPreferences {
    static setTheme(theme) {
        StorageManager.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    static getTheme() {
        return StorageManager.getItem('theme') || 'light';
    }

    static setLanguage(lang) {
        StorageManager.setItem('language', lang);
    }

    static getLanguage() {
        return StorageManager.getItem('language') || 'es';
    }

    static saveUserData(data) {
        StorageManager.setItem('userData', data);
    }

    static getUserData() {
        return StorageManager.getItem('userData');
    }
}

// Logger personalizado
class Logger {
    static log(message, data = null) {
        console.log(`[INFO] ${message}`, data);
    }

    static warn(message, data = null) {
        console.warn(`[WARN] ${message}`, data);
    }

    static error(message, data = null) {
        console.error(`[ERROR] ${message}`, data);
    }

    static success(message, data = null) {
        console.log(`[SUCCESS] ✓ ${message}`, data);
    }
}

// Utilidades de DOM
class DOMHelper {
    static querySelector(selector) {
        return document.querySelector(selector);
    }

    static querySelectorAll(selector) {
        return document.querySelectorAll(selector);
    }

    static createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'class') {
                element.className = attributes[key];
            } else if (key === 'style') {
                Object.assign(element.style, attributes[key]);
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });

        if (content) {
            element.innerHTML = content;
        }

        return element;
    }

    static addEvent(element, event, callback) {
        if (element) {
            element.addEventListener(event, callback);
        }
    }

    static removeEvent(element, event, callback) {
        if (element) {
            element.removeEventListener(event, callback);
        }
    }

    static addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    }

    static removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    }

    static toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    }

    static hasClass(element, className) {
        return element ? element.classList.contains(className) : false;
    }
}

// Gestor de Analytics (básico)
class Analytics {
    static trackEvent(eventName, eventData = {}) {
        Logger.log(`Evento registrado: ${eventName}`, eventData);
        // Aquí se integraría con Google Analytics o similar
    }

    static trackPageView(pageName) {
        Logger.log(`Vista de página: ${pageName}`);
    }

    static trackFormSubmission(formName) {
        this.trackEvent('form_submission', { form_name: formName });
    }
}

// Ejemplo de uso
/*
// Instanciar API Helper
const api = new APIHelper('/api');

// Validar un email
const isValid = FormValidator.validateEmail('usuario@example.com');

// Guardar preferencias
UserPreferences.setTheme('light');
UserPreferences.setLanguage('es');

// Registrar eventos
Analytics.trackEvent('user_signup', { source: 'homepage' });
*/

// Exportar para uso en módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Config,
        APIHelper,
        FormValidator,
        TimeUtils,
        StorageManager,
        UserPreferences,
        Logger,
        DOMHelper,
        Analytics
    };
}
