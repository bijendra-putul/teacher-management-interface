
'use client';
import { useForm } from 'react-hook-form';
import { PaymentBlockData } from '../interface/teacherBlock';
import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

interface PaymentBlockFormProps {
  teacherId: string;
  onSubmit: (data: PaymentBlockData) => void;
}

function PaymentBlockForm({ teacherId, onSubmit }: PaymentBlockFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentBlockData>();
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = async (data: PaymentBlockData) => {
    setIsLoading(true);
    try {
      await onSubmit({ ...data, teacherId });
      reset();
      alert('Payment processed successfully!');
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto"
      aria-label="Payment form"
    >
      <h2 className="text-xl font-bold mb-4">Process Payment</h2>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (₹)
        </label>
        <input
          type="number"
          id="amount"
          {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Amount must be positive' } })}
          className={`mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.amount ? 'true' : 'false'}
          aria-describedby="amount-error"
        />
        {errors.amount && (
          <p id="amount-error" className="text-red-500 text-sm mt-1">
            {errors.amount.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
          UPI ID
        </label>
        <input
          type="text"
          id="upiId"
          {...register('upiId', {
            required: 'UPI ID is required',
            pattern: { value: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, message: 'Invalid UPI ID' },
          })}
          className={`mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 ${
            errors.upiId ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={errors.upiId ? 'true' : 'false'}
          aria-describedby="upiId-error"
        />
        {errors.upiId && (
          <p id="upiId-error" className="text-red-500 text-sm mt-1">
            {errors.upiId.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          {...register('notes')}
          className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 border-gray-300"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex justify-center items-center"
        aria-label="Submit payment"
      >
        {isLoading ? <LoadingSpinner /> : 'Process Payment'}
      </button>
    </form>
  );

}


export default PaymentBlockForm;