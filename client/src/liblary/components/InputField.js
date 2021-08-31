import React from 'react';




const InputField = ({ value, label, placeholder, onChange}) => {


    return (
        <div className="form-group">
            {label && <label className="font-weight-bold">{label}</label>}
            <input className="form-control py-4"  type="name" aria-describedby="emailHelp"
                   placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}



export default InputField