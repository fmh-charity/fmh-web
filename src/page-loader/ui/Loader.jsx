import React from 'react';

import pic1 from '../../assets/images/1.png';
import pic2 from '../../assets/images/2.png';
import pic3 from '../../assets/images/3.png';
import pic4 from '../../assets/images/4.png';
import pic5 from '../../assets/images/5.png';
import pic6 from '../../assets/images/6.png';
import pic7 from '../../assets/images/7.png';
import pic8 from '../../assets/images/8.png';
import pic9 from '../../assets/images/9.png';
import pic10 from '../../assets/images/10.png';
import pic11 from '../../assets/images/11.png';
import pic12 from '../../assets/images/12.png';
import pic13 from '../../assets/images/13.png';
import pic14 from '../../assets/images/14.png';
import pic15 from '../../assets/images/15.png';

import styles from './style.css';

const picMap = {
  0: { pic: pic1, color: 'red' },
  1: { pic: pic2, color: 'green' },
  2: { pic: pic3, color: 'blue' },
  3: { pic: pic4, color: 'orange' },
  4: { pic: pic5, color: 'blue' },
  5: { pic: pic6, color: 'rose' },
  6: { pic: pic7, color: 'biruzu' },
  7: { pic: pic8, color: 'red' },
  8: { pic: pic9, color: 'green'},
  9: { pic: pic10, color: 'blue' },
  10: { pic: pic11, color: 'biruzu' },
  11: { pic: pic12, color: 'red' },
  12: { pic: pic13, color: 'green' },
  13: { pic: pic14, color: 'blue' },
  14: { pic: pic15, color: 'red' },
};

const phrases = [
  'Ответственно и осознанно нести добро людям',
  'Помощь – это создание комфорта для пациентов и их близких',
  'Ответственно и осознанно нести добро людям',
  'Добро есть везде и во всех',
  'Любая помощь важна и нужна',
  'Творческий и осознанный подход к жизни пациента',
  'Ответственная доброта',
  'Создание физического и психологического пространства для завершения жизни',
  'Творческий и осознанный подход к жизни пациента',
  'Чем больше мы принимаем добра, тем больше отдаем',
  'Творческий и осознанный подход к жизни пациента',
  'Хоспис – это воплощенная гуманность',
  'Хоспис — это призвание и служение человечеству',
  'Хоспис – это компетентная помощь и любовь к пациентам',
];

export const Loader = () => {
  const randomPhrasaNumber = Math.floor(Math.random() * (phrases.length - 0) + 0);
  const phrasa = phrases[randomPhrasaNumber];

  console.log(phrasa, randomPhrasaNumber, phrases.length);

  return (
    <div className={`loader ${picMap[randomPhrasaNumber].color}`}>
      <img 
        src={picMap[randomPhrasaNumber].pic} 
        alt={phrasa} 
      />
      <div className="dot-pulse" />
      <div className="phrasa-block">
        <p>{phrasa}</p>
      </div>
    </div>
  );
};
