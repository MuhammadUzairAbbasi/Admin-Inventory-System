import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Dialog } from "./ui/Dialog";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Dialog isOpen={true} onClose={onCancel} title="Confirm Action">
      <div className="space-y-4">
        <p className="text-gray-700 text-sm">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  );
}
