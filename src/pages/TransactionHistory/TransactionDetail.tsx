import { useParams, useNavigate } from 'react-router-dom';
import { mockTransactions } from '../../data/mockData';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TransactionDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const transaction = mockTransactions.find(t => t.id === id);

	if (!transaction) {
		return (
			<div className="transaction-container">
				<div className="transaction-content">
					<button onClick={() => navigate(-1)} className="mb-4 flex items-center text-green-600 hover:underline">
						<ArrowLeftIcon className="w-5 h-5 mr-1" /> Back
					</button>
					<div className="transaction-card">
						<h2>Transaction Not Found</h2>
						<p>The transaction you are looking for does not exist.</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="transaction-container">
			<div className="transaction-content">
				<button onClick={() => navigate(-1)} className="mb-4 flex items-center text-green-600 hover:underline">
					<ArrowLeftIcon className="w-5 h-5 mr-1" /> Back
				</button>
				<div className="transaction-card">
					<h2 className="text-xl font-bold mb-2">Transaction Detail</h2>
					<div className="mb-2"><strong>ID:</strong> {transaction.id}</div>
					<div className="mb-2"><strong>Type:</strong> {transaction.type}</div>
					<div className="mb-2"><strong>Amount:</strong> ${transaction.amount.toLocaleString()}</div>
					<div className="mb-2"><strong>Date:</strong> {transaction.date}</div>
					<div className="mb-2"><strong>Status:</strong> {transaction.status}</div>
				</div>
			</div>
		</div>
	);
}
