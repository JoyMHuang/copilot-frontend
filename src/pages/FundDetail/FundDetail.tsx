import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FundListApiService from '../../services/fundApi';
import type { FundDetailDto } from '../../types/fundDetailDto';
import './FundDetail.css';

const fieldLabels: { [key: string]: string } = {
  id: 'Fund ID',
  fundName: 'Fund Name',
  code: 'Fund Code',
  unitPrice: 'Unit Net Value',
  currencyCode: 'Currency Code',
  priceDate: 'Net Value Date',
  navChange: 'Net Value Change',
  navChangePercent: 'Net Value Change Percent',
  fundType: 'Fund Type',
  manager: 'Fund Manager',
  establishDate: 'Establishment Date',
  fundSize: 'Fund Size',
  riskLevel: 'Risk Level',
  description: 'Fund Description',
};

export default function FundDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<FundDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(id)
    if (id) {
      FundListApiService.getFundDetail(id)
        .then(data => {
          setDetail(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch fund detail');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!detail) return <div>No detail found.</div>;

  const fields = Object.keys(fieldLabels);
  const leftFields = fields.slice(0, Math.ceil(fields.length / 2));
  const rightFields = fields.slice(Math.ceil(fields.length / 2));

  return (
    <div className="fund-detail-container">
      <h2 className="fund-detail-title">Fund Detail</h2>
      <div className="fund-detail-row">
        <div className="fund-detail-col">
          {leftFields.map(key => (
            <div key={key} className="fund-detail-item">
              <span className="fund-detail-label">{fieldLabels[key]}:</span>
              <span className="fund-detail-value">{(detail as any)[key]}</span>
            </div>
          ))}
        </div>
        <div className="fund-detail-col">
          {rightFields.map(key => (
            <div key={key} className="fund-detail-item">
              <span className="fund-detail-label">{fieldLabels[key]}:</span>
              <span className="fund-detail-value">{(detail as any)[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}