import { useParams, useNavigate } from 'react-router-dom';
import { mockTransactions } from '../../data/mockData';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TransactionDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const transaction = mockTransactions.find(t => t.id === id);

	// 假设每个交易都有关联的fundId，这里用id代替fundId（如有fundId请替换）
	const fundId = id;

	const handleDownloadReport = async () => {
		try {
			const response = await fetch(
				`http://localhost:8000/api/fund/${fundId}/performance/pdf?latest=true`,
				{ method: 'GET' }
			);
			console.log('response-----------------',response);
			
			if (!response.ok) throw new Error('Failed to download PDF');
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `transaction-report-${id}.pdf`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.log('error-------------------',error);

			alert('下载报告失败');
		}
	};

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
					<button
						className="mt-4 px-4 py-2 bg-green-500 text-white rounded shadow-sm hover:bg-green-600"
						onClick={handleDownloadReport}
					>
						下载交易报告 PDF
					</button>
				</div>
			</div>
		</div>
	);
}
