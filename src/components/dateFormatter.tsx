import React from 'react';

interface FormatDateTimeProps {
  targetDate: string;
}

const FormatDateTime: React.FC<FormatDateTimeProps> = ({ targetDate }) => {
  const sanangiz = new Date(targetDate);

  const yil = sanangiz.getFullYear();
  const oy = (sanangiz.getMonth() + 1).toString().padStart(2, '0');
  const kun = sanangiz.getDate().toString().padStart(2, '0');
  const soat = sanangiz.getHours().toString().padStart(2, '0');
  const minut = sanangiz.getMinutes().toString().padStart(2, '0');

  const getMonthOy = (() => {
    switch (oy) {
      case '01':
        return 'yanvar';
      case '02':
        return 'fevral';
      case '03':
        return 'mart';
      case '04':
        return 'aprel';
      case '05':
        return 'may';
      case '06':
        return 'iyun';
      case '07':
        return 'iyul';
      case '08':
        return 'avgust';
      case '09':
        return 'sentabr';
      case '10':
        return 'oktyabr';
      case '11':
        return 'noyabr';
      case '12':
        return 'dekabr';
      default:
        return '';
    }
  });

  const formattedDate = `${yil} yil ${kun} ${getMonthOy()} ${soat}:${minut}`;

  return <span>{formattedDate}</span>;
}

export default FormatDateTime;
