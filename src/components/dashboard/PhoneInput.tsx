import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneNumberInput() {
  const [phone, setPhone] = useState('');

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-sm text-black">Phone Number</label>
      <PhoneInput
        country={'ng'}
        value={phone}
        onChange={(phone) => setPhone(phone)}
        inputStyle={{
          width: '100%',
          height: '40px',
          borderRadius: '0.5rem',
          border: '1px solid #ccc',
        }}
        buttonStyle={{
          borderTopLeftRadius: '0.5rem',
          borderBottomLeftRadius: '0.5rem',
        }}
        containerStyle={{ width: '100%' }}
      />
    </div>
  );
}
