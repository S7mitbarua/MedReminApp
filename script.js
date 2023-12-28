document.addEventListener('DOMContentLoaded', function () {
    loadMedications();
});

function addMedication() {
    const medName = getValueById('medName');
    const medTime = getValueById('medTime');
    const medSpecialty = getValueById('medSpecialty');
    const medType = getValueById('medType');

    if (medName && medTime && medSpecialty && medType) {
        const medication = {
            name: medName,
            time: medTime,
            specialty: medSpecialty,
            type: medType
        };

        saveMedication(medication);
        resetForm();
        loadMedications();
    } else {
        alert('Please fill in all fields.');
    }
}

function resetAllMedications() {
    const confirmReset = confirm('Are you sure you want to reset all medications? This action cannot be undone.');

    if (confirmReset) {
        clearMedications();
        loadMedications();
    }
}

function getValueById(id) {
    return document.getElementById(id).value.trim();
}

function saveMedication(medication) {
    const medications = getMedicationsFromStorage();
    medications.push(medication);
    setMedicationsToStorage(medications);
}

function loadMedications() {
    const medications = getMedicationsFromStorage();
    const medList = document.getElementById('medList');
    medList.innerHTML = '';

    medications.forEach(medication => {
        const listItem = createMedicationListItem(medication);
        medList.appendChild(listItem);
    });
}

function createMedicationListItem(medication) {
    const li = document.createElement('li');
    li.textContent = `${medication.name} - ${medication.time} - Specialty: ${medication.specialty} - Type: ${medication.type}`;

    const deleteButton = createDeleteButton(() => handleDelete(medication));
    li.appendChild(deleteButton);

    return li;
}

function createDeleteButton(onClick) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', onClick);
    return deleteButton;
}

function handleDelete(medication) {
    const medications = getMedicationsFromStorage();
    const index = medications.indexOf(medication);

    if (index !== -1) {
        medications.splice(index, 1);
        setMedicationsToStorage(medications);
        loadMedications();
    }
}

function resetForm() {
    document.getElementById('medForm').reset();
}

function getMedicationsFromStorage() {
    return JSON.parse(localStorage.getItem('medications')) || [];
}

function setMedicationsToStorage(medications) {
    localStorage.setItem('medications', JSON.stringify(medications));
}

function clearMedications() {
    localStorage.removeItem('medications');
}

