import React from "react";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => (
  <div className="mb-3">
    <div className="d-flex justify-content-center">
      <div className={`me-2 ${step1 ? "fw-bold" : "text-muted"}`}>
        Sign In ➡{" "}
      </div>
      <div className={`me-2 ${step2 ? "fw-bold" : "text-muted"}`}>
        Shipping ➡
      </div>
      <div className={`me-2 ${step3 ? "fw-bold" : "text-muted"}`}>
        Payment ➡
      </div>
      <div className={`${step4 ? "fw-bold" : "text-muted"}`}>Place Order</div>
    </div>
  </div>
);
export default CheckoutSteps;
