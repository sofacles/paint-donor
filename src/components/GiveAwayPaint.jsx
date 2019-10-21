import  React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import {RgbDisplay} from './RgbDisplay';
import { UseForm } from './UseForm';
import { validateOneField } from './PaintFormValidationRules';

const GiveAwayPaint = () => {

  const onColorSelected = (color) => {
    setFields({
      ...fields,
      rgb: color
    });
  }

  const [paintPosted, setPaintPosted ] = useState(false);

  const callback = async () => {
    await fetch('/api/paints', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields)
    });
    setPaintPosted(true);
  }; 
  
  const { fields, setFields, setField, blurField, errors, handleSubmit } = UseForm(callback, validateOneField);

  return paintPosted ? <Redirect to="/ThankYou" /> 
   :
  <form onSubmit={(e) => handleSubmit(e)}>
    <h2>I want to give away some paint!</h2>

    <label htmlFor="brand">brand:</label>
    <input name="brand" id="brand"
      onChange={(e) => {
        setField(e);
      }} 
      onBlur={(e) => {
        blurField(e);
      }}
    />
    {errors.brand && <p className="error"><span >{errors.brand}</span></p>}

    <label htmlFor="name">color name on can:</label>
    <input name="name" id="name"
      onChange={(e) => {
        setField(e);
      }} 
      onBlur={(e) => {
        blurField(e);
      }}
     />
    {errors.name && <p className="error"><span >{errors.name}</span></p>}

    <label htmlFor="quantity">quantity:</label>
    <input name="quantity" 
      id="quantity"
      onChange={(e) => {
        setField(e);
      }} 
      onBlur={(e) => {
        blurField(e);
      }} 
    />

    {errors.quantity && <p className="error"><span >{errors.quantity}</span></p>}

    <label htmlFor="email">email:</label>
    <input name="email" id="email" 
        onChange={(e) => {
          setField(e);
        }} 
        onBlur={(e) => {
          blurField(e);
        }}
    />
    {errors.email && <p className="error"><span >{errors.email}</span></p>}
    

    <label htmlFor="confirmEmail">confirm email:</label>
    <input name="confirmEmail"  id="confirmEmail" 
        onChange={(e) => {
          setField(e);
        }} 
        onBlur={(e) => {
          blurField(e, true);
        }}
    />
    {errors.confirmEmail && <p className="error"><span data-testid="confirm-email-error" >{errors.confirmEmail}</span></p>}
    
    <h4>Either take a picture of something you painted. Maybe a wall?</h4>
    <p>
      <RgbDisplay onColorChosen={onColorSelected}/>
    </p>
    <p> 
      <label htmlFor="save" className="hidden"> post your paint </label>
      <input type="submit" value="save" id="save" />
    </p>
    <div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>
  </form>
};

export default GiveAwayPaint;