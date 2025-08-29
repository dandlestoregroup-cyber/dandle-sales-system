import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';

const OrderForm = ({ t, language, DANDLE_COLORS, productData, addOns, productStories, colorOptions, dashboardData, userProgress, setModal }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [isUrgent, setIsUrgent] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [commission, setCommission] = useState(0);
    const [total, setTotal] = useState(0);

    const availableProducts = Object.keys(productData);
    const availableVariants = selectedProduct ? Object.keys(productData[selectedProduct]) : [];

    useEffect(() => {
        let currentSubtotal = 0;
        if (selectedProduct && selectedVariant) {
            currentSubtotal += productData[selectedProduct][selectedVariant].price;
        }
        selectedAddOns.forEach(addonId => {
            const addon = addOns.find(a => a.id === addonId);
            if (addon) {
                currentSubtotal += addon.price;
            }
        });
        if (isUrgent) {
            currentSubtotal += 2500;
        }
        setSubtotal(currentSubtotal);
        setCommission(currentSubtotal * 0.035);
        setTotal(currentSubtotal * 1.035);
    }, [selectedProduct, selectedVariant, selectedAddOns, isUrgent, productData, addOns]);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
        setSelectedVariant('');
        setSelectedColor('');
        setSelectedAddOns([]);
    };

    const handleAddOnToggle = (addonId) => {
        setSelectedAddOns(prev =>
            prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
        );
    };

    const handleSubmitOrder = () => {
        if (!customerName || !customerPhone || !selectedProduct || !selectedVariant || !selectedColor) {
            setModal({
                isOpen: true,
                title: t('error'),
                content: t('fillAllFields'),
                onClose: () => setModal({ isOpen: false })
            });
            return;
        }

        const orderDetails = {
            customerName,
            customerPhone,
            product: selectedProduct,
            variant: selectedVariant,
            color: selectedColor,
            addOns: selectedAddOns,
            isUrgent,
            subtotal,
            commission,
            total,
            timestamp: new Date().toISOString()
        };

        setModal({
            isOpen: true,
            title: t('orderSummary'),
            content: (
                <div>
                    <p>{t('customerName')}: {customerName}</p>
                    <p>{t('customerPhone')}: {customerPhone}</p>
                    <p>{t('productSelection')}: {language === 'ar' ? productData[selectedProduct][selectedVariant].nameAr : productData[selectedProduct][selectedVariant].nameEn}</p>
                    <p>{t('color')}: {language === 'ar' ? colorOptions.find(c => c.value === selectedColor)?.ar : selectedColor}</p>
                    {selectedAddOns.length > 0 && (
                        <p>{t('addOns')}: {selectedAddOns.map(id => (language === 'ar' ? addOns.find(a => a.id === id)?.nameAr : addOns.find(a => a.id === id)?.nameEn)).join(', ')}</p>
                    )}
                    {isUrgent && <p>{t('urgentOrder')}</p>}
                    <p>{t('subtotal')}: {subtotal.toLocaleString()} EGP</p>
                    <p>{t('commission')}: {commission.toLocaleString()} EGP</p>
                    <p>{t('total')}: {total.toLocaleString()} EGP</p>
                    <div className="mt-4 text-center">
                        <QrCode size={64} className="mx-auto" />
                        <p className="text-sm text-gray-600 mt-2">{t('generateQR')}</p>
                    </div>
                </div>
            ),
            onClose: () => setModal({ isOpen: false })
        });

        // Reset form after submission
        setCustomerName('');
        setCustomerPhone('');
        setSelectedProduct('');
        setSelectedVariant('');
        setSelectedColor('');
        setSelectedAddOns([]);
        setIsUrgent(false);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: DANDLE_COLORS.text }}>{t('orderForm')}</h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder={t('customerName')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                />
                <input
                    type="tel"
                    placeholder={t('customerPhone')}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                />

                {/* Product Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('productSelection')}</label>
                    <select
                        value={selectedProduct}
                        onChange={handleProductChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">{t('selectProduct')}</option>
                        {availableProducts.map(productId => (
                            <option key={productId} value={productId}>
                                {language === 'ar' ? productData[productId][Object.keys(productData[productId])[0]].nameAr.split(' ')[0] : productData[productId][Object.keys(productData[productId])[0]].nameEn.split(' ')[0]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Variant Selection */}
                {selectedProduct && availableVariants.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('variant')}</label>
                        <select
                            value={selectedVariant}
                            onChange={(e) => setSelectedVariant(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">{t('selectVariant')}</option>
                            {availableVariants.map(variantId => (
                                <option key={variantId} value={variantId}>
                                    {language === 'ar' ? productData[selectedProduct][variantId].nameAr : productData[selectedProduct][variantId].nameEn}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Color Selection */}
                {selectedProduct && selectedVariant && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('color')}</label>
                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                        >
                            <option value="">{t('selectColor')}</option>
                            {colorOptions.map(color => (
                                <option key={color.value} value={color.value}>
                                    {language === 'ar' ? color.ar : color.value}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Add-ons */}
                {selectedProduct && selectedVariant && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('addOns')}</label>
                        <div className="flex flex-wrap gap-2">
                            {addOns.map(addon => (
                                <button
                                    key={addon.id}
                                    onClick={() => handleAddOnToggle(addon.id)}
                                    className={`px-3 py-1 border rounded-full text-sm ${selectedAddOns.includes(addon.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    {language === 'ar' ? addon.nameAr : addon.nameEn} (+{addon.price} EGP)
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Urgent Order */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="urgentOrder"
                        checked={isUrgent}
                        onChange={(e) => setIsUrgent(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="urgentOrder" className="text-sm font-medium text-gray-700">{t('urgentOrder')}</label>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{t('orderTotal')}</h3>
                    <div className="flex justify-between text-sm mb-1">
                        <span>{t('subtotal')}:</span>
                        <span>{subtotal.toLocaleString()} EGP</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>{t('commission')}:</span>
                        <span>{commission.toLocaleString()} EGP</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold" style={{ color: DANDLE_COLORS.primary }}>
                        <span>{t('total')}:</span>
                        <span>{total.toLocaleString()} EGP</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmitOrder}
                    className="w-full text-white p-4 rounded-lg font-semibold"
                    style={{ background: DANDLE_COLORS.primary }}
                >
                    {t('submitOrder')}
                </button>
            </div>
        </div>
    );
};

export default OrderForm;

