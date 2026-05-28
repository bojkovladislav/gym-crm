import { Transaction } from '@/features/BillingSales/BillingSales';
import { formatDateString } from '@/helpers/formatters';
import React from 'react';

interface InvoiceProps {
    transaction: Transaction;
}

export const InvoiceComponent = React.forwardRef<HTMLDivElement, InvoiceProps>(
    ({ transaction }, ref) => {
        return (
            <div
                ref={ref}
                id='invoice-container'
                style={{
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '20mm',
                    backgroundColor: '#fff',
                    fontFamily: 'sans-serif',
                    color: '#333',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '2px solid #eee',
                        paddingBottom: '20px',
                    }}
                >
                    <div>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: '28px',
                                color: '#111',
                            }}
                        >
                            INVOICE
                        </h1>
                        <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                            Date: {formatDateString(transaction.createdAt)}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ margin: 0 }}>Gym CRM Inc.</h3>
                        <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                            support@gymcrm.com
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <h4
                        style={{
                            borderBottom: '1px solid #eee',
                            paddingBottom: '5px',
                        }}
                    >
                        Transaction Details
                    </h4>
                    <p>
                        <strong>Description:</strong> {transaction.description}
                    </p>
                    <p>
                        <strong>Type:</strong> {transaction.type}
                    </p>
                </div>

                <div
                    style={{
                        marginTop: '40px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <div
                        style={{
                            textAlign: 'right',
                            width: '200px',
                            borderTop: '2px solid #111',
                            paddingTop: '10px',
                        }}
                    >
                        <span style={{ fontSize: '14px', color: '#666' }}>
                            Total Amount:
                        </span>
                        <h2 style={{ margin: '5px 0 0 0', color: '#111' }}>
                            {transaction.amount}
                        </h2>
                    </div>
                </div>
            </div>
        );
    },
);

InvoiceComponent.displayName = 'InvoiceComponent';
