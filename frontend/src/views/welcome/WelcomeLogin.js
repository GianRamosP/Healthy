import Exercises from '../../views/exercises/Exercises'
import ImgExercises from '../../assets/images/exercises/exercises.png'

const WelcomeLogin = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        ¡Bienvenido de nuevo {user?.name || 'Usuario'}! Nos alegra tenerte aquí.
      </h1>

      {/* Agregar imagen centrada */}
      <div className="text-center mb-4">
        <img
          src={ImgExercises}
          alt="Descripción de la imagen"
          className="img-fluid"
          style={{ maxWidth: '30%' }}
        />
      </div>

      {/* <Exercises token={localStorage.getItem('token')} /> */}
      <div className="space-y-6"></div>
    </div>
  )
}

export default WelcomeLogin
