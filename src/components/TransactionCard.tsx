import type { Transaction } from '../types/transaction';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

interface TransactionCardProps {
  transaction: Transaction;
}

const getStatusIcon = (status: Transaction['status']) => {
  switch (status) {
    case 'Completed':
      return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
    case 'Processing':
    case 'Pending':
      return <ClockIcon className="w-5 h-5 text-yellow-600" />;
    case 'Failed':
      return <XCircleIcon className="w-5 h-5 text-red-600" />;
    case 'Cancelled':
      return <ExclamationTriangleIcon className="w-5 h-5 text-gray-600" />;
    default:
      return <ClockIcon className="w-5 h-5 text-gray-600" />;
  }
};

const getStatusColor = (status: Transaction['status']) => {
  switch (status) {
    case 'Completed':
      return 'text-green-600 bg-green-50';
    case 'Processing':
    case 'Pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'Failed':
      return 'text-red-600 bg-red-50';
    case 'Cancelled':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getTypeIcon = (type: Transaction['transactionType']) => {
  switch (type) {
    case 'Subscribe':
      return <ArrowRightIcon className="w-5 h-5 text-green-600" />;
    case 'Redeem':
      return <ArrowLeftIcon className="w-5 h-5 text-red-600" />;
    case 'Switch-In':
      return <ArrowRightIcon className="w-5 h-5 text-blue-600" />;
    case 'Switch-Out':
      return <ArrowLeftIcon className="w-5 h-5 text-blue-600" />;
    case 'Dividend':
    case 'Fee':
      return <BanknotesIcon className="w-5 h-5 text-purple-600" />;
    default:
      return <BanknotesIcon className="w-5 h-5 text-gray-600" />;
  }
};

const getTypeColor = (type: Transaction['transactionType']) => {
  switch (type) {
    case 'Subscribe':
      return 'text-green-600';
    case 'Redeem':
      return 'text-red-600';
    case 'Switch-In':
    case 'Switch-Out':
      return 'text-blue-600';
    case 'Dividend':
    case 'Fee':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};

const getTypeLabel = (type: Transaction['transactionType']) => {
  switch (type) {
    case 'Subscribe':
      return '申购';
    case 'Redeem':
      return '赎回';
    case 'Switch-In':
      return '转入';
    case 'Switch-Out':
      return '转出';
    case 'Dividend':
      return '分红';
    case 'Fee':
      return '费用';
    default:
      return type;
  }
};

const getStatusLabel = (status: Transaction['status']) => {
  switch (status) {
    case 'Completed':
      return '已完成';
    case 'Processing':
      return '处理中';
    case 'Pending':
      return '等待中';
    case 'Failed':
      return '失败';
    case 'Cancelled':
      return '已取消';
    default:
      return status;
  }
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const formattedDate = new Date(transaction.transactionDate).toLocaleDateString('zh-CN');
  const formattedAmount = transaction.amount.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* 头部：交易类型和状态 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          {getTypeIcon(transaction.transactionType)}
          <div>
            <h3 className={`text-lg font-semibold ${getTypeColor(transaction.transactionType)}`}>
              {getTypeLabel(transaction.transactionType)}
            </h3>
            <p className="text-sm text-gray-500">
              {transaction.reference}
            </p>
          </div>
        </div>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
          {getStatusIcon(transaction.status)}
          <span className="ml-1">{getStatusLabel(transaction.status)}</span>
        </div>
      </div>

      {/* 基金信息 */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-900 mb-1">{transaction.fundName}</p>
        <p className="text-sm text-gray-500">代码: {transaction.fundCode}</p>
      </div>

      {/* 交易金额和单位 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">交易金额</p>
          <p className="text-lg font-semibold text-gray-900">
            {formattedAmount} {transaction.currency}
          </p>
        </div>
        {transaction.units > 0 && (
          <div>
            <p className="text-sm text-gray-500">交易单位</p>
            <p className="text-lg font-semibold text-gray-900">
              {transaction.units.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </div>

      {/* 基金转换信息 */}
      {transaction.switchToFund && (
        <div className="mb-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            转换至: {transaction.switchToFund.name} ({transaction.switchToFund.code})
          </p>
        </div>
      )}

      {/* 底部信息 */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          <span>交易日期: {formattedDate}</span>
          {transaction.feeAmount && (
            <span className="ml-4">费用: {transaction.feeAmount} {transaction.currency}</span>
          )}
        </div>
        <div className="text-right">
          <div>渠道: {transaction.channel}</div>
          {transaction.description && (
            <div className="text-xs text-gray-400 mt-1">{transaction.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}
