export interface TeacherBlock {
  id: string;
  name: string;
  subject: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  amount: number;
}

export interface PaymentBlockData {
  teacherId: string;
  amount: number;
  upiId: string;
  notes?: string;
}
