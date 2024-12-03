import ImgWelcome from '../../assets/images/exercises/welcome.png'

const Welcome = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-left mb-4">
        <img
          src={ImgWelcome}
          alt="Descripción de la imagen"
          className="img-fluid"
          style={{ maxWidth: '150px' }}
        />
      </div>

      <h1 className="text-2xl font-bold mb-4">¡Registro exitoso! Bienvenido.</h1>
      <h2 className="text-[4px] mb-4">Tenemos algunas recomendaciones iniciales para ti</h2>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">1. Bajar de Peso</h2>
          <p className="font-bold">Recomendación: Haz ejercicio cardiovascular regularmente.</p>
          <p>
            Detalles: Realiza al menos 150 minutos de ejercicio cardiovascular a la semana, que
            puede incluir actividades como correr, nadar, andar en bicicleta o hacer clases de
            aeróbicos. Intenta dividir este tiempo en sesiones de al menos 30 minutos, cinco días a
            la semana. El cardio ayuda a aumentar tu ritmo cardíaco, lo que quema calorías y mejora
            la salud cardiovascular. Para maximizar la pérdida de peso, considera incluir
            entrenamientos en intervalos de alta intensidad (HIIT), donde alternas entre períodos de
            alta intensidad y descanso. Esto puede aumentar significativamente la quema de calorías
            incluso después de terminar el ejercicio.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">2. Aumentar Masa Muscular</h2>
          <p className="font-bold">Recomendación: Entrena con pesas al menos 3 veces por semana.</p>
          <p>
            Detalles: Incorpora ejercicios de fuerza que trabajen todos los grupos musculares. Es
            recomendable hacer un programa que incluya movimientos compuestos como sentadillas, peso
            muerto, press de banca y dominadas, ya que estos ejercicios reclutan múltiples músculos
            a la vez. Comienza con un peso que te permita realizar de 8 a 12 repeticiones por serie
            y aumenta progresivamente a medida que te sientas más fuerte. Asegúrate de descansar
            adecuadamente entre sesiones, permitiendo que tus músculos se recuperen y crezcan.
            También considera un enfoque de entrenamiento dividido, enfocándote en diferentes grupos
            musculares en diferentes días para maximizar el desarrollo muscular.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">3. Mejora de la Resistencia</h2>
          <p className="font-bold">Recomendación: Incorpora intervalos en tus entrenamientos.</p>
          <p>
            Detalles: Los entrenamientos en intervalos son una forma efectiva de mejorar tu
            resistencia y capacidad cardiovascular. Por ejemplo, durante una carrera, corre a alta
            velocidad durante 30 segundos y luego camina o trota a un ritmo suave durante 1-2
            minutos. Repite este ciclo durante 20-30 minutos. También puedes aplicar esta técnica en
            ejercicios como el ciclismo o la natación. Los intervalos no solo ayudan a quemar más
            calorías, sino que también mejoran la eficiencia de tu cuerpo para utilizar el oxígeno.
            Puedes empezar con intervalos más largos y disminuir el tiempo de descanso a medida que
            tu condición mejora.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">4. Aumentar Flexibilidad</h2>
          <p className="font-bold">
            Recomendación: Dedica tiempo a estiramientos después de entrenar.
          </p>
          <p>
            Detalles: La flexibilidad es clave para el rendimiento deportivo y la prevención de
            lesiones. Después de cada sesión de entrenamiento, dedica al menos 10-15 minutos a
            estiramientos estáticos que se enfoquen en los grupos musculares que trabajaste. Por
            ejemplo, estira tus piernas, espalda y brazos. Mantén cada estiramiento durante 15-30
            segundos. También considera incorporar yoga o pilates en tu rutina semanal, ya que estas
            prácticas no solo mejoran la flexibilidad, sino que también promueven la fuerza y la
            relajación.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">5. Mantener un Estilo de Vida Saludable</h2>
          <p className="font-bold">Recomendación: Hidrátate adecuadamente.</p>
          <p>
            Detalles: La hidratación es fundamental para un rendimiento óptimo y la recuperación.
            Intenta beber al menos 2 litros de agua al día, y aumenta esta cantidad si haces
            ejercicio intenso o si el clima es caluroso. Una buena regla es beber agua antes,
            durante y después del ejercicio. Presta atención a las señales de tu cuerpo; si sientes
            sed, ya estás algo deshidratado. Considera llevar una botella de agua contigo y
            establece recordatorios si es necesario. También, durante actividades prolongadas,
            puedes considerar bebidas deportivas que reemplacen electrolitos.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">6. Mejora de la Alimentación</h2>
          <p className="font-bold">Recomendación: Consume proteínas magras en cada comida.</p>
          <p>
            Detalles: La proteína es esencial para la recuperación muscular y el crecimiento.
            Intenta incluir fuentes de proteínas magras en cada comida, como pollo, pavo, pescado,
            huevos, legumbres, tofu o productos lácteos bajos en grasa. Un buen objetivo es consumir
            entre 1.2 y 2.0 gramos de proteína por kilogramo de peso corporal, dependiendo de tus
            objetivos. Además, combina la proteína con carbohidratos complejos (como arroz integral
            o quinoa) y grasas saludables (como aguacate o frutos secos) para tener una comida
            balanceada que mantenga tu energía durante todo el día.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">7. Establecimiento de Metas</h2>
          <p className="font-bold">Recomendación: Establece metas SMART.</p>
          <p>
            Detalles: Utiliza el enfoque SMART para establecer tus objetivos. Esto significa que tus
            metas deben ser Específicas (definir exactamente lo que deseas lograr), Medibles (puedes
            cuantificar tu progreso), Alcanzables (realistas y alcanzables), Relevantes (que se
            alineen con tus objetivos a largo plazo) y con un Tiempo definido (establecer un plazo
            claro). Por ejemplo, en lugar de decir "quiero perder peso", establece "quiero perder 5
            kg en los próximos 3 meses". Esto te dará un objetivo claro y un sentido de dirección,
            lo que puede aumentar tu motivación.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
