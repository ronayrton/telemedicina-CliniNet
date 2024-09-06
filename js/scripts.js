document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error(error);
    }
});

async function fetchConsultas() {
    try {
        const response = await fetch('http://localhost:5000/api/consultas', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const consultas = await response.json();
        const consultasList = document.getElementById('consultasList');
        consultas.forEach(consulta => {
            const li = document.createElement('li');
            li.textContent = `${consulta.data} - ${consulta.paciente}`;
            consultasList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('agendarConsultaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const paciente = document.getElementById('paciente').value;
    const data = document.getElementById('data').value;
    try {
        await fetch('http://localhost:5000/api/consultas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ paciente, data })
        });
        alert('Consulta agendada com sucesso');
    } catch (error) {
        console.error(error);
    }
});
