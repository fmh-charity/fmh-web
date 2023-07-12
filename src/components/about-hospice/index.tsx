import styles from "./index.module.less";

export const About = () => {
  return (
    <section className={styles.about}>
      <h4 className={styles.aboutHeader}>Хоспис №1 им. В.В. Миллионщиковой</h4>
      <div className={styles.aboutAddress}>
        <h4 className={styles.aboutAddressTitle}>Фактический адрес</h4>
        <div className={styles.aboutAddressMain}>
          <p className={styles.aboutAddressMainText}>119048, г. Москва, ул. Доватора, д. 10</p>
          <img className={styles.aboutAddressMainImg} src="/images/map.jpg" alt="map" />
        </div>
      </div>
      <div className={styles.aboutContacts}>
        <h4 className={styles.aboutContactsTitle}>Телефоны</h4>
        <div className={styles.aboutContactsMain}>
          <p className={styles.aboutContactsMainText}>Приемное отделение: <b>+7 499 245 00 03</b> (круглосуточно)</p>
          <p className={styles.aboutContactsMainText}>Отделение выездной паллиативной помощи: <b>+7 499 245 00 09</b> (круглосуточно)</p>
        </div>
      </div>
      <div className={styles.aboutRegime}>
        <h4 className={styles.aboutRegimeTitle}>Режим работы хосписа</h4>
        <div className={styles.aboutRegimeMain}>
          <p className={styles.aboutRegimeMainText}>Отделение выездной паллиативной службы: <b>ежедневно</b></p>
          <p className={styles.aboutRegimeMainText}>Стационар: <b>круглосуточно</b></p>
          <p className={styles.aboutRegimeMainText}>Посещение пациентов: <b>круглосуточно</b></p>
        </div>
      </div>
      <div className={styles.aboutWorkingMode}>
        <h4 className={styles.aboutWorkingModeTitle}>Режим работы хосписа</h4>
        <div className={styles.aboutWorkingModeMain}>
          <p className={styles.aboutWorkingModeMainText}>Подача документов производится через Координационный центр по телефону и электронной почте: <br /><b>+7 499 940-19-48</b><br /><b>+7 499 940-19-50</b></p>
          <div className={styles.aboutWorkingModeMainLinks}>
            <a className={styles.aboutWorkingModeMainLinksItem} href="lifelist@zdrav.mos.ru">lifelist@zdrav.mos.ru</a>
            <a className={styles.aboutWorkingModeMainLinksItem} href="9401948@mos.ru">9401948@mos.ru</a>
          </div>
          <p className={styles.aboutWorkingModeMainBottomText}>Маршрутизация пациентов осуществляется с учётом района проживания и пожеланий пациента и его близких.</p>
        </div>
      </div>
      <div className={styles.aboutNavigation}>
        <h4 className={styles.aboutNavigationTitle}>Режим работы хосписа</h4>
        <div className={styles.aboutNavigationMain}>
          <div className={styles.aboutNavigationMainAfoot}>
            <h5 className={styles.aboutNavigationMainAfootTitle}><b>ПЕШКОМ</b></h5>
            <p className={styles.aboutNavigationMainAfootText}>От станции метро «Спортивная» Сокольнической линии (последний вагон из центра) посетители доберутся до Хосписа № 1 им. В.В. Миллионщиковой за пару минут: поднявшись вверх по эскалатору и выйдя на улицу, повернуть налево и двигаться к комплексу зданий учреждения, окружённому забором из красного кирпича (вход — со стороны улицы Доватора).</p>
          </div>
          <div className={styles.aboutNavigationMainCar}>
            <h5 className={styles.aboutNavigationMainCarTitle}><b>НА АВТОМОБИЛЕ</b></h5>
            <p className={styles.aboutNavigationMainCarText}>Следуя по внутренней стороне ТТК (Луженецкая эстакада), осуществить съезд направо, на Луженецкий проезд, далее через 400 метров сдать правее и, двигаясь по Малой Пироговской улице, свернуть направо, на улицу 10-летия Октября (хоспис расположен на перекрёстке с улицей Доватора, вход — со стороны улицы Доватора).</p>
          </div>
        </div>
      </div>
      <div className={styles.aboutLink}>
        <h4 className={styles.aboutLinkTitle}>Официальный сайт</h4>
        <div className={styles.aboutLinkMain}>
          <a className={styles.aboutLinkMainText} href="https://cpmdzm.ru/">https://cpmdzm.ru/</a>
        </div>
      </div>
    </section>
  );
};
