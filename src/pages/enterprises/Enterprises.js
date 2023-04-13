import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import request from '@/utils/request';
import getSessionUser from '@/utils/getSessionUser';
import Button from '@/components/Button';

import CreateEnterpriseModal from './CreateEnterpriseModal';

const Enterprises = () => {
	const router = useRouter();
  const [enterprises, setEnterprises] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [user, setUser] = useState(null)

	const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

	const getEnterprises = () => {
		request('enterprises', 'GET')
		.then((response) => {
			if (response.status !== 200) {
				throw new Error()
			}

			return response.body;
		})
		.then((data) => setEnterprises(data))
		.catch((error) => console.error('Error fetching enterprises:', error));
	}

  useEffect(() => {
		setUser(getSessionUser())

		getEnterprises()
  }, []);

	const TableHeader = ({children}) =>(
		<th
			scope="col"
			className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
		>
			{children}
		</th>
	)

	const TableCell = ({children}) => ( <td className="px-6 py-4 whitespace-nowrap">{children}</td>)

  const Table = () => (<div className="mx-auto">
	<div className="overflow-x-auto text-center">
		{ enterprises.length ? <table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					<TableHeader>
						<input type="checkbox" className="rounded" />
					</TableHeader>
					<TableHeader>
						NIT
					</TableHeader>
					<TableHeader>
						Name
					</TableHeader>
					<TableHeader>
						Address
					</TableHeader>
					<TableHeader>
						Phone
					</TableHeader>
					<TableHeader>
						{/* Empty column for View Details CTA */}
					</TableHeader>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{ enterprises.map((enterprise) => (
					<tr key={enterprise.NIT}>
						<TableCell>
							<input type="checkbox" className="rounded" />
						</TableCell>
						<TableCell>{enterprise.NIT}</TableCell>
						<TableCell>{enterprise.name}</TableCell>
						<TableCell>{enterprise.address}</TableCell>
						<TableCell>{enterprise.phone}</TableCell>
						<TableCell>
							<button className="text-blue-500 hover:text-blue-700">
								View Details
							</button>
						</TableCell>
					</tr>
				))}
			</tbody>
		</table> : <span> No enterprises </span>}
	</div>
</div>)

const ActionPane = () => (
	<div className="mb-4 flex justify-between gap-2">
		<Button variant="success" onClick={openModal}>
			Create Enterprise
		</Button>
		<Button
			variant="danger"
			onClick={() => console.log('Delete Selected')}
			disabled={true}
		>
			Delete Selected
		</Button>
	</div>
);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col items-center sm:py-12">
      <div className="relative py-3 sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Enterprises</h1>
					{user?.role === 'Admin' && <ActionPane />}
          <Table />
					{ user?.role === 'Admin' && <CreateEnterpriseModal isOpen={isModalOpen} onClose={closeModal} onFinish={getEnterprises}/>}
        </div>
      </div>
			<Button className="w-40" onClick={() => router.replace('/logout')} >Log out</Button>
    </div>
  );
};

export default Enterprises;