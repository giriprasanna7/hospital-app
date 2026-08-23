import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const API = `http://${window.location.hostname}:7000/api`;

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState({ name:"", age:"", gender:"Male", phone:"", address:"" });
  const [doctor, setDoctor] = useState({ name:"", specialization:"", phone:"", availability:"Available" });

  const loadPatients = async () => setPatients(await (await fetch(`${API}/patients`)).json());
  const loadDoctors = async () => setDoctors(await (await fetch(`${API}/doctors`)).json());

  useEffect(() => { loadPatients(); loadDoctors(); }, []);

  const addPatient = async (e) => {
    e.preventDefault();
    await fetch(`${API}/patients`, {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(patient)
    });
    setPatient({ name:"", age:"", gender:"Male", phone:"", address:"" });
    await loadPatients();
    alert("Patient added successfully");
  };

  const deletePatient = async (id) => {
    await fetch(`${API}/patients/${id}`, { method:"DELETE" });
    loadPatients();
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    await fetch(`${API}/doctors`, {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(doctor)
    });
    setDoctor({ name:"", specialization:"", phone:"", availability:"Available" });
    await loadDoctors();
    alert("Doctor added successfully");
  };

  const deleteDoctor = async (id) => {
    await fetch(`${API}/doctors/${id}`, { method:"DELETE" });
    loadDoctors();
  };

  return (
    <div className="app">
      <header><h1>Hospital Management System</h1><p>Manage Patients and Doctors</p></header>
      <main>
        <section className="card">
          <h2>Add Patient</h2>
          <form onSubmit={addPatient}>
            <input placeholder="Patient Name" value={patient.name} onChange={e=>setPatient({...patient,name:e.target.value})} required />
            <input type="number" placeholder="Age" value={patient.age} onChange={e=>setPatient({...patient,age:e.target.value})} required />
            <select value={patient.gender} onChange={e=>setPatient({...patient,gender:e.target.value})}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
            <input placeholder="Phone" value={patient.phone} onChange={e=>setPatient({...patient,phone:e.target.value})} required />
            <input placeholder="Address" value={patient.address} onChange={e=>setPatient({...patient,address:e.target.value})} required />
            <button type="submit">Add Patient</button>
          </form>
        </section>

        <section className="card">
          <h2>Patients</h2>
          {patients.length === 0 ? <p>No patients found.</p> : patients.map(p =>
            <div className="item" key={p._id}>
              <div><h3>{p.name}</h3><p>Age: {p.age}</p><p>Gender: {p.gender}</p><p>Phone: {p.phone}</p><p>Address: {p.address}</p></div>
              <button className="delete" onClick={()=>deletePatient(p._id)}>Delete</button>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Add Doctor</h2>
          <form onSubmit={addDoctor}>
            <input placeholder="Doctor Name" value={doctor.name} onChange={e=>setDoctor({...doctor,name:e.target.value})} required />
            <input placeholder="Specialization" value={doctor.specialization} onChange={e=>setDoctor({...doctor,specialization:e.target.value})} required />
            <input placeholder="Phone" value={doctor.phone} onChange={e=>setDoctor({...doctor,phone:e.target.value})} required />
            <select value={doctor.availability} onChange={e=>setDoctor({...doctor,availability:e.target.value})}>
              <option>Available</option><option>Not Available</option>
            </select>
            <button type="submit">Add Doctor</button>
          </form>
        </section>

        <section className="card">
          <h2>Doctors</h2>
          {doctors.length === 0 ? <p>No doctors found.</p> : doctors.map(d =>
            <div className="item" key={d._id}>
              <div><h3>{d.name}</h3><p>Specialization: {d.specialization}</p><p>Phone: {d.phone}</p><p>Availability: {d.availability}</p></div>
              <button className="delete" onClick={()=>deleteDoctor(d._id)}>Delete</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
