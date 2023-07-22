import styles from "./index.module.less";

export const About = () => {
  const table = [
    {
      id: 1,
      title: "Фактический адрес",
      main: (
        <>
          <p className={styles.addressText}>119048, г. Москва, ул. Доватора, д. 10</p>
          <img className={styles.addressImg} src="/images/map.jpg" alt="map" />
        </>
      )
    },
    {
      id: 2,
      title: "Телефоны",
      main: (
        <div className={styles.contacts}>
          <p className={styles.contactsText}>Приемное отделение: <b>+7 499 245 00 03</b> (круглосуточно)</p>
          <p className={styles.contactsText}>Отделение выездной паллиативной помощи: <b>+7 499 245 00 09</b> (круглосуточно)</p>
        </div>
      )
    },
    {
      id: 3,
      title: "Режим работы хосписа",
      main: (
        <>
          <p className={styles.regimeText}>Отделение выездной паллиативной службы: <b>ежедневно</b></p>
          <p className={styles.regimeText}>Стационар: <b>круглосуточно</b></p>
          <p className={styles.regimeText}>Посещение пациентов: <b>круглосуточно</b></p>
        </>
      )
    },
    {
      id: 4,
      title: "Режим работы хосписа",
      main: (
        <>
          <p className={styles.workingModeText}>Подача документов производится через Координационный центр по телефону и электронной почте: <br /><b>+7 499 940-19-48</b><br /><b>+7 499 940-19-50</b></p>
          <div className={styles.workingModeLinks}>
            <a className={styles.workingModeLinksItem} href="lifelist@zdrav.mos.ru">lifelist@zdrav.mos.ru</a>
            <a className={styles.workingModeLinksItem} href="9401948@mos.ru">9401948@mos.ru</a>
          </div>
          <p className={styles.workingModeBottomText}>Маршрутизация пациентов осуществляется с учётом района проживания и пожеланий пациента и его близких.</p>
        </>
      )
    },
    {
      id: 5,
      title: "Схема проезда",
      main: (
        <>
          <div className={styles.navigationAfoot}>
            <h5 className={styles.navigationAfootTitle}><b>ПЕШКОМ</b></h5>
            <p className={styles.navigationAfootText}>От станции метро «Спортивная» Сокольнической линии (последний вагон из центра) посетители доберутся до Хосписа № 1 им. В.В. Миллионщиковой за пару минут: поднявшись вверх по эскалатору и выйдя на улицу, повернуть налево и двигаться к комплексу зданий учреждения, окружённому забором из красного кирпича (вход — со стороны улицы Доватора).</p>
          </div>
          <div className={styles.navigationCar}>
            <h5 className={styles.navigationCarTitle}><b>НА АВТОМОБИЛЕ</b></h5>
            <p className={styles.navigationCarText}>Следуя по внутренней стороне ТТК (Луженецкая эстакада), осуществить съезд направо, на Луженецкий проезд, далее через 400 метров сдать правее и, двигаясь по Малой Пироговской улице, свернуть направо, на улицу 10-летия Октября (хоспис расположен на перекрёстке с улицей Доватора, вход — со стороны улицы Доватора).</p>
          </div>
        </>
      )
    },
    {
      id: 6,
      title: "Официальный сайт",
      main: (
        <>
          <a className={styles.linkText} href="https://cpmdzm.ru/">https://cpmdzm.ru/</a>
        </>
      )
    },
  ];

  return (
    <section className={styles.about}>
      <h4 className={styles.aboutHeader}>Хоспис №1 им. В.В. Миллионщиковой</h4>
      {table.map((el) => (
        <div className={styles.aboutInner} key={el.id}>
          <h4 className={styles.aboutInnerTitle}>{el.title}</h4>
          <div className={styles.aboutInnerContent}>
            {el.main}
          </div>
        </div>
      ))}
    </section>
  );
};
