import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FundApiService from '../../services/fundApi';
import type { FundDetailDto } from '../../types';
import styles from './index.module.css';

const FundDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<FundDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    FundApiService.getFundDetail(id)
      .then(setData)
      .catch(() => setError('加载基金详情失败'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>未找到基金详情</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>基金详情</h2>
      <div className={styles.fields}>
        <div><span className={styles.label}>基金ID：</span>{data.id}</div>
        <div><span className={styles.label}>基金名称：</span>{data.fundName}</div>
        <div><span className={styles.label}>基金代码：</span>{data.code}</div>
        <div><span className={styles.label}>单位净值：</span>{data.unitPrice}</div>
        <div><span className={styles.label}>币种代码：</span>{data.currencyCode}</div>
        <div><span className={styles.label}>净值日期：</span>{data.priceDate}</div>
        <div><span className={styles.label}>净值涨跌：</span>{data.navChange}</div>
        <div><span className={styles.label}>净值涨跌幅(%)：</span>{data.navChangePercent}</div>
        <div><span className={styles.label}>产品代码：</span>{data.productCode}</div>
        <div><span className={styles.label}>风险属性：</span>{data.riskNature}</div>
        <div><span className={styles.label}>资产类别：</span>{data.assestClass}</div>
      </div>
    </div>
  );
};

export default FundDetail;
