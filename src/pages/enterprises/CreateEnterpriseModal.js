import React, { useState } from 'react';
import request from '@/utils/request';

import Modal from '@/components/Modal';

import TextInput from '@/components/TextInput';
import Button from '@/components/Button';
import Alert from '@/components/Alert';

const CreateEnterpriseModal = ({ isOpen, onClose, onFinish }) => {
  const [nit, setNit] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
	const [error, setError] = useState(null);

	const clearForm = () => {
   // Clear the form
	 setNit('');
	 setName('');
	 setAddress('');
	 setPhone('');
	 setError(null)

	}

  

  const handleSubmit = (e) => {
    e.preventDefault();

		if (!nit || !name || !address || !phone) {
      setError('All fields are required.');
      return;
    }
    const createEnterprise = request('enterprises', 'POST', { NIT: nit, name, address, phone })

    createEnterprise.then(response => {
      if (response.status === 400) {
        setError(response.body.message)
        return;
      }

      onFinish();
      handleClose();

    }).catch(error => {
      setError('Network Error')
    })
  };

	const handleClose = () => {
		clearForm()
		onClose()
	}

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-bold text-center mb-8">Create Enterprise</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextInput
            type="number"
            label="NIT"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            placeholder="Enter NIT"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
          />
        </div>
        <div className="mb-4">
          <TextInput
            type="number"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone"
          />
        </div>
				{error && (
          <Alert message={error} status="error" className="mb-4" onClose={() => setError(null)} />
        )}
        <div className="flex justify-end">
          <Button type="button" variant="danger" onClick={handleClose} className="mr-2">
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateEnterpriseModal;
