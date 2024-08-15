import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  onClose: () => void;
};

function AddFloor({ onClose }: Props) {
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');

  const handleAddFloor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://37.60.235.86:8001/api/v1/common/floor-list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, order: Number(order) }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Qavat qo\'shildi:', data);
        toast.success('Qavat muvaffaqiyatli qo\'shildi!');
        setTimeout(() => {
          onClose(); // Close the modal after 2 seconds
          window.location.reload(); 
        }, 2000);
      } else {
        console.error('Xatolik yuz berdi:', response.statusText);
        toast.error('Xatolik yuz berdi: ' + response.statusText);
      }
    } catch (error) {
      console.error('Xatolik:', error);
      toast.error('Xatolik yuz berdi: ');
    }
  };

  return (
    <>
      <form onSubmit={handleAddFloor} style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Qavat nomi</label>
          <input
            id="name"
            type="text"
            placeholder="Nomni kiriting"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="order">Qavat tartibi</label>
          <input
            id="order"
            type="number"
            placeholder="Tartib raqamini kiriting"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
        >
          Qo'shish
        </button>
      </form>
      <ToastContainer />
    </>
  );
}

export default AddFloor;
