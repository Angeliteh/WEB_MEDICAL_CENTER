// Modern Datepicker - Clean and Simple Date Picker
// Sistema moderno de selección de fechas sin conflictos

class ModernDatepicker {
    constructor() {
        this.isInitialized = false;
        this.currentField = null;
        this.init();
    }
    
    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }
    
    initialize() {
        // Buscar campos de fecha
        this.initializeDateFields();
        
        // Observar nuevos campos
        this.observeNewFields();
        
        this.isInitialized = true;
        console.log('📅 Modern Datepicker initialized');
    }
    
    initializeDateFields() {
        const dateFields = document.querySelectorAll('input[name="appointment_date"], #appointment-datepicker');
        dateFields.forEach(field => {
            this.setupDateField(field);
        });
    }
    
    setupDateField(field) {
        // Configurar el campo
        field.type = 'text';
        field.readOnly = true;
        field.placeholder = 'Seleccionar fecha';
        field.style.cursor = 'pointer';
        field.style.backgroundColor = 'white';
        
        // Agregar eventos
        field.addEventListener('click', (e) => {
            e.preventDefault();
            this.showDatePicker(field);
        });
        
        // Configurar icono de calendario
        const calendarIcon = field.parentElement.querySelector('.fa-calendar');
        if (calendarIcon) {
            calendarIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.showDatePicker(field);
            });
        }
        
        console.log('📅 Date field configured:', field.id || field.name);
    }
    
    showDatePicker(field) {
        this.currentField = field;
        
        // Remover datepicker existente
        this.removeDatePicker();
        
        // Crear nuevo datepicker
        const datePicker = this.createDatePicker();
        
        // Posicionar datepicker
        this.positionDatePicker(datePicker, field);
        
        // Agregar al DOM
        document.body.appendChild(datePicker);
        
        // Configurar eventos de cierre
        this.setupCloseEvents(datePicker);
        
        // Animar entrada
        setTimeout(() => {
            datePicker.classList.add('show');
        }, 10);
    }
    
    createDatePicker() {
        const datePicker = document.createElement('div');
        datePicker.className = 'modern-datepicker';
        datePicker.id = 'modern-datepicker';
        
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        datePicker.innerHTML = `
            <div class="datepicker-header">
                <button type="button" class="datepicker-nav prev" data-action="prev-month">
                    <i class="fa fa-chevron-left"></i>
                </button>
                <div class="datepicker-title">
                    <span class="month-year">${this.getMonthName(currentMonth)} ${currentYear}</span>
                </div>
                <button type="button" class="datepicker-nav next" data-action="next-month">
                    <i class="fa fa-chevron-right"></i>
                </button>
            </div>
            <div class="datepicker-body">
                <div class="datepicker-weekdays">
                    <div class="weekday">Lu</div>
                    <div class="weekday">Ma</div>
                    <div class="weekday">Mi</div>
                    <div class="weekday">Ju</div>
                    <div class="weekday">Vi</div>
                    <div class="weekday disabled">Sa</div>
                    <div class="weekday disabled">Do</div>
                </div>
                <div class="datepicker-days" id="datepicker-days">
                    ${this.generateCalendarDays(currentMonth, currentYear)}
                </div>
            </div>
            <div class="datepicker-footer">
                <button type="button" class="datepicker-btn cancel">Cancelar</button>
                <button type="button" class="datepicker-btn today">Hoy</button>
            </div>
        `;
        
        // Configurar eventos
        this.setupDatePickerEvents(datePicker, currentMonth, currentYear);
        
        return datePicker;
    }
    
    generateCalendarDays(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalizar para comparación

        // Ajustar para que la semana empiece en lunes
        let startDay = firstDay.getDay() - 1;
        if (startDay < 0) startDay = 6;

        let html = '';
        let date = 1;

        // Días del mes anterior (deshabilitados)
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = startDay - 1; i >= 0; i--) {
            const prevDate = prevMonth.getDate() - i;
            html += `<div class="day disabled prev-month">${prevDate}</div>`;
        }

        // Días del mes actual
        while (date <= lastDay.getDate()) {
            const currentDate = new Date(year, month, date);
            currentDate.setHours(0, 0, 0, 0); // Normalizar para comparación

            const dayOfWeek = currentDate.getDay();
            const isToday = this.isSameDay(currentDate, today);
            const isPast = currentDate < today;
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Domingo o sábado
            const isTooFar = this.isDateTooFar(currentDate);

            let classes = 'day';
            if (isToday) classes += ' today';
            if (isPast || isWeekend || isTooFar) classes += ' disabled';

            // Asegurar que los valores sean números válidos
            const dayData = parseInt(date);
            const monthData = parseInt(month);
            const yearData = parseInt(year);

            html += `<div class="${classes}" data-date="${dayData}" data-month="${monthData}" data-year="${yearData}">${date}</div>`;
            date++;
        }

        // Completar la última semana con días del siguiente mes
        const totalCells = Math.ceil((startDay + lastDay.getDate()) / 7) * 7;
        const remainingCells = totalCells - (startDay + lastDay.getDate());
        for (let i = 1; i <= remainingCells; i++) {
            html += `<div class="day disabled next-month">${i}</div>`;
        }

        return html;
    }
    
    setupDatePickerEvents(datePicker, currentMonth, currentYear) {
        // Guardar estado actual en el datePicker
        datePicker._currentMonth = currentMonth;
        datePicker._currentYear = currentYear;

        // Navegación de meses
        datePicker.querySelector('.prev').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            datePicker._currentMonth--;
            if (datePicker._currentMonth < 0) {
                datePicker._currentMonth = 11;
                datePicker._currentYear--;
            }
            this.updateCalendar(datePicker, datePicker._currentMonth, datePicker._currentYear);
        });

        datePicker.querySelector('.next').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            datePicker._currentMonth++;
            if (datePicker._currentMonth > 11) {
                datePicker._currentMonth = 0;
                datePicker._currentYear++;
            }
            this.updateCalendar(datePicker, datePicker._currentMonth, datePicker._currentYear);
        });

        // Selección de días
        datePicker.addEventListener('click', (e) => {
            if (e.target.classList.contains('day') && !e.target.classList.contains('disabled')) {
                e.preventDefault();
                e.stopPropagation();

                const date = parseInt(e.target.dataset.date);
                const month = parseInt(e.target.dataset.month);
                const year = parseInt(e.target.dataset.year);

                console.log('📅 Raw dataset:', {
                    date: e.target.dataset.date,
                    month: e.target.dataset.month,
                    year: e.target.dataset.year
                });

                console.log('📅 Parsed values:', { date, month, year });

                // Usar el mes actual del datepicker si el dataset está mal
                const finalMonth = isNaN(month) ? datePicker._currentMonth : month;
                const finalYear = isNaN(year) ? datePicker._currentYear : year;

                this.selectDate(date, finalMonth, finalYear);
            }
        });

        // Botones del footer
        datePicker.querySelector('.cancel').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeDatePicker();
        });

        datePicker.querySelector('.today').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const today = new Date();
            this.selectDate(today.getDate(), today.getMonth(), today.getFullYear());
        });
    }
    
    updateCalendar(datePicker, month, year) {
        const monthYear = datePicker.querySelector('.month-year');
        const daysContainer = datePicker.querySelector('#datepicker-days');

        if (monthYear && daysContainer) {
            monthYear.textContent = `${this.getMonthName(month)} ${year}`;
            daysContainer.innerHTML = this.generateCalendarDays(month, year);

            // Actualizar estado
            datePicker._currentMonth = month;
            datePicker._currentYear = year;

            console.log(`📅 Calendar updated: ${this.getMonthName(month)} ${year}`);
        }
    }
    
    selectDate(date, month, year) {
        console.log(`📅 Selecting date: ${date}/${month + 1}/${year}`);

        const formattedDate = this.formatDate(date, month, year);
        console.log(`📅 Formatted date: ${formattedDate}`);

        if (this.currentField) {
            this.currentField.value = formattedDate;

            // Disparar evento de cambio
            const changeEvent = new Event('change', { bubbles: true });
            this.currentField.dispatchEvent(changeEvent);

            // Validar campo si hay form handler
            if (window.formHandlerManager) {
                const form = this.currentField.closest('form');
                if (form) {
                    window.formHandlerManager.validateField(form.id, this.currentField);
                }
            }

            // Anunciar para screen readers
            if (window.accessibilityManager) {
                window.accessibilityManager.announceSuccess(`Fecha seleccionada: ${formattedDate}`);
            }

            console.log(`📅 Date selected successfully: ${formattedDate}`);
        }

        this.closeDatePicker();
    }
    
    formatDate(date, month, year) {
        const day = String(date).padStart(2, '0');
        const monthStr = String(month + 1).padStart(2, '0'); // month ya es 0-based, solo sumar 1
        return `${day}/${monthStr}/${year}`;
    }
    
    positionDatePicker(datePicker, field) {
        const rect = field.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        
        let top = rect.bottom + scrollTop + 5;
        let left = rect.left + scrollLeft;
        
        // Ajustar si se sale de la pantalla
        const datePickerWidth = 300;
        const datePickerHeight = 350;
        
        if (left + datePickerWidth > window.innerWidth) {
            left = window.innerWidth - datePickerWidth - 20;
        }
        
        if (top + datePickerHeight > window.innerHeight + scrollTop) {
            top = rect.top + scrollTop - datePickerHeight - 5;
        }
        
        datePicker.style.position = 'absolute';
        datePicker.style.top = `${top}px`;
        datePicker.style.left = `${left}px`;
        datePicker.style.zIndex = '10000';
    }
    
    setupCloseEvents(datePicker) {
        // Cerrar al hacer clic fuera
        const handleOutsideClick = (e) => {
            if (!datePicker.contains(e.target) &&
                e.target !== this.currentField &&
                !e.target.classList.contains('fa-calendar')) {
                this.closeDatePicker();
                document.removeEventListener('click', handleOutsideClick);
            }
        };

        // Agregar listener después de un pequeño delay para evitar cierre inmediato
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 100);

        // Cerrar con Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeDatePicker();
                document.removeEventListener('keydown', handleEscape);
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Guardar referencias para poder removerlas después
        datePicker._outsideClickHandler = handleOutsideClick;
        datePicker._escapeHandler = handleEscape;
    }
    
    closeDatePicker() {
        const datePicker = document.getElementById('modern-datepicker');
        if (datePicker) {
            // Remover event listeners
            if (datePicker._outsideClickHandler) {
                document.removeEventListener('click', datePicker._outsideClickHandler);
            }
            if (datePicker._escapeHandler) {
                document.removeEventListener('keydown', datePicker._escapeHandler);
            }

            datePicker.classList.add('hide');
            setTimeout(() => {
                if (datePicker.parentElement) {
                    datePicker.remove();
                }
            }, 200);
        }
        this.currentField = null;
    }
    
    removeDatePicker() {
        const existing = document.getElementById('modern-datepicker');
        if (existing) {
            existing.remove();
        }
    }
    
    observeNewFields() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        const dateFields = node.querySelectorAll ? 
                            node.querySelectorAll('input[name="appointment_date"], #appointment-datepicker') : [];
                        dateFields.forEach(field => this.setupDateField(field));
                    }
                });
            });
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    // Utilidades
    getMonthName(month) {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[month];
    }
    
    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }
    
    isDateTooFar(date) {
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 6); // 6 meses adelante (más flexible)
        maxDate.setHours(23, 59, 59, 999); // Final del día
        return date > maxDate;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.modernDatepicker = new ModernDatepicker();
});

console.log('📅 Modern Datepicker loaded');
