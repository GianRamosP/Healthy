import React from 'react'
import QrImage from '../../assets/images/qr.png'

export default function Pay() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Pagar</h1>
      <p style={styles.text}>Escanea el código QR para realizar el pago</p>
      <div style={styles.qrContainer}>
        <img src={QrImage} alt="Código QR para pagar" style={styles.qrCode} />
      </div>
      <p style={styles.footer}>Gracias por tu compra</p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    color: '#333',
    padding: '0 20px',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#555',
  },
  qrContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  qrCode: {
    width: '200px',
    height: '200px',
  },
  footer: {
    marginTop: '20px',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#777',
  },
}
