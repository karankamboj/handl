import mongoose from 'mongoose';

export interface IRequest {
  title: string;
  description: string;
  status: string;
  createdBy: string;
  acceptedBy: string;
  creationDate: Date;
  acceptanceDate: Date;
}

export const RequestSchema = new mongoose.Schema<IRequest>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  acceptedBy: {
    type: String,
    required: false
  },
  creationDate: {
    type: Date,
    required: true
  },
  acceptanceDate: {
    type: Date,
    required: false
  }
});

export const Request = mongoose.model<IRequest>('requests', RequestSchema);
