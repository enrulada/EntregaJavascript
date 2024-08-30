// Inicialización de variables y objetos para almacenar datos
const data = {
    osde: { count: 0, sum: 0 },
    ospe: { count: 0, sum: 0 },
    swiss: { count: 0, sum: 0 },
    galeno: { count: 0, sum: 0 },
    prevencion: { count: 0, sum: 0 },
    daspu: { count: 0, sum: 0 },
    apos: { count: 0, sum: 0 },
    iosfa: { count: 0, sum: 0 },
    medife: { count: 0, sum: 0 }
};

document.getElementById('submitCode').addEventListener('click', () => {
    const gestorCode = parseInt(document.getElementById('gestorCode').value);
    const inputsDiv = document.getElementById('inputs');
    const resultsDiv = document.getElementById('results');

    if (gestorCode >= 1 && gestorCode <= 3) {
        inputsDiv.classList.remove('hidden');
        resultsDiv.textContent = '';
    } else {
        inputsDiv.classList.add('hidden');
        resultsDiv.textContent = 'El código de gestor no es válido.';
    }
});

document.getElementById('submitRequest').addEventListener('click', () => {
    const gestorCode = parseInt(document.getElementById('gestorCode').value);
    const patientName = document.getElementById('patientName').value;
    const healthcareName = document.getElementById('healthcareName').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    
    if (!patientName || !healthcareName) {
        resultsDiv.textContent = 'Por favor, ingrese todos los datos.';
        return;
    }

    // Actualizar los datos de las órdenes de cirugía
    const healthKey = getHealthKey(healthcareName);
    if (healthKey) {
        data[healthKey].count++;
        data[healthKey].sum += 1; // Sumamos 1 por cada solicitud de cirugía
    } else {
        resultsDiv.textContent = 'Obra social no reconocida.';
        return;
    }

    // Mostrar el resultado después de ingresar una solicitud
    if (gestorCode === 1) {
        resultsDiv.textContent = getSummary(['osde', 'ospe', 'swiss']);
    } else if (gestorCode === 2) {
        resultsDiv.textContent = getSummary(['galeno', 'prevencion', 'daspu']);
    } else if (gestorCode === 3) {
        resultsDiv.textContent = getSummary(['apos', 'iosfa', 'medife']);
    }
});

function getHealthKey(name) {
    const keys = {
        osde: 'osde',
        ospe: 'ospe',
        swiss: 'swiss',
        galeno: 'galeno',
        prevencion: 'prevencion',
        daspu: 'daspu',
        apos: 'apos',
        iosfa: 'iosfa',
        medife: 'medife'
    };
    return keys[name] || null;
}

function getSummary(healthcareKeys) {
    const summaries = healthcareKeys.map(key => {
        return `Obra Social: ${key.charAt(0).toUpperCase() + key.slice(1)} - Contador: ${data[key].count}, Sumatoria: ${data[key].sum}`;
    });
    const highestSumKey = healthcareKeys.reduce((maxKey, key) => {
        return data[key].sum > data[maxKey].sum ? key : maxKey;
    }, healthcareKeys[0]);
    summaries.push(`Obra Social con mayor sumatoria: ${highestSumKey.charAt(0).toUpperCase() + highestSumKey.slice(1)} - Sumatoria: ${data[highestSumKey].sum}`);
    return summaries.join('\n');
}

  

