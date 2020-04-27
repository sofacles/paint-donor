import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ToggleContent } from "./ToggleContent";
import { ThirdColorProvider } from "./ThirdColor/ThirdColorContext";
import SelectOtherInput from "./select-other-input/SelectOtherInput";
import ColorPicker from "./ColorPicker";
import Modal from "./Modal";
import { RgbDisplay } from "./RgbDisplay";
import { RgbIcon } from "./RgbIcon";
import UseForm from "./UseForm";
import ValidationRulesObj from "./PaintFormValidationRules";

const uuid = require("uuid/v4");
const querystring = require("querystring");

const GiveAwayPaint = () => {
  const onValidationSuccess = async fields => {
    let formObj = new FormData();
    let fileInput = document.getElementById("uploadPhoto");
    if (fileInput.files.length > 0) {
      formObj.append("imageName", uuid());
      formObj.append("imageData", fileInput.files[0]);
    }
    let qs = querystring.encode(fields);

    axios
      .post(`/api/paints/?${qs}`, formObj)
      .then(data => {
        if (data.status === 200) {
          setPaintPosted(true);
        }
      })
      .catch(err => {
        debugger;
      });
  };

  const { setField, blurField, errors, handleSubmit } = UseForm(
    onValidationSuccess,
    ValidationRulesObj
  );
  const [paintPosted, setPaintPosted] = useState(false);
  const onColorSelected = color => {
    setField({
      target: {
        name: "rgb",
        value: color
      }
    });
  };

  return paintPosted ? (
    <Redirect to="/ThankYou" />
  ) : (
    <div className="donate-paint">
      <form onSubmit={e => handleSubmit(e)}>
        <h2>I want to give away some paint!</h2>
        <aside>
          <Link to="/browsePaint">Back to Paints</Link>
        </aside>
        <SelectOtherInput
          id="brand"
          onNewValue={newValue => {
            setField({
              target: {
                name: "brand",
                value: newValue
              }
            });
          }}
          onBlur={e => {
            blurField(e);
          }}
          initialValues={[
            "- choose -",
            "Sherwin-Williams",
            "Farrow & Ball",
            "Miller",
            "Behr",
            "Dunn-Edwards",
            "Glidden",
            "Rodda",
            "Benjamin Moore",
            "other"
          ]}
          label="Brand:"
        />
        {errors.brand && (
          <p className="error">
            <span>{errors.brand}</span>
          </p>
        )}

        <label htmlFor="name">Color Name:</label>
        <input
          name="name"
          id="name"
          onChange={e => {
            setField(e);
          }}
          onBlur={e => {
            blurField(e);
          }}
        />
        {errors.name && (
          <p className="error">
            <span>{errors.name}</span>
          </p>
        )}

        <SelectOtherInput
          id="quantity"
          onNewValue={newValue => {
            setField({
              target: {
                name: "quantity",
                value: newValue
              }
            });
          }}
          onBlur={e => {
            blurField(e);
          }}
          initialValues={[
            "- choose -",
            "about a quart",
            "less than a gallon",
            "less than two gallons",
            "less than five gallons",
            "other"
          ]}
          label="Quantity:"
        />

        {errors.quantity && (
          <p className="error">
            <span>{errors.quantity}</span>
          </p>
        )}

        <label htmlFor="sheen">Sheen:</label>
        <select
          name="sheen"
          id="sheen"
          onChange={e => {
            setField(e);
          }}
          onBlur={e => {
            blurField(e);
          }}
        >
          <option value="">--</option>
          <option value="flat">flat</option>
          <option value="eggshell">eggshell</option>
          <option value="semi">semi gloss</option>
          <option value="gloss">high gloss</option>
        </select>

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          id="email"
          onChange={e => {
            setField(e);
          }}
          onBlur={e => {
            blurField(e);
          }}
        />
        {errors.email && (
          <p className="error">
            <span>{errors.email}</span>
          </p>
        )}

        <label htmlFor="confirmEmail">Confirm Email:</label>
        <input
          name="confirmEmail"
          id="confirmEmail"
          onChange={e => {
            setField(e);
          }}
          onBlur={e => {
            blurField(e, true);
          }}
        />
        {errors.confirmEmail && (
          <p className="error">
            <span data-testid="confirm-email-error">{errors.confirmEmail}</span>
          </p>
        )}

        <label htmlFor="zipCode">Zip Code:</label>
        <input
          name="zipCode"
          id="zipCode"
          onChange={e => {
            setField(e);
          }}
          onBlur={e => {
            blurField(e, true);
          }}
        />
        {errors.zipCode && (
          <p className="error">
            <span data-testid="zip-code-error">{errors.zipCode}</span>
          </p>
        )}

        <h4>Take a picture of something you painted </h4>
        <input
          type="file"
          id="uploadPhoto"
          name="uploadPhoto"
          onChange={e => {
            setField(e);
          }}
        />

        <ThirdColorProvider>
          <h4>
           You can also use the 
            <ToggleContent
              toggle={show => (
                <span className="emphasize-on-hover" onClick={e => {
                  show();
                }}
                >
                  color picker    
                </span>
                  
              )}
              content={hide => (
                <Modal>
                  <ColorPicker onColorChosen={onColorSelected} />
                  <button
                    onClick={e => {
                      e.preventDefault();
                      hide();
                    }}
                  >
                    Close
                  </button>
                </Modal>
              )}
            />
          </h4>
          <ToggleContent
            toggle={show => (
              <p>
                <RgbIcon
                  onClick={e => {
                    show();
                  }}
                ></RgbIcon>
                <RgbDisplay onColorChosen={onColorSelected} />
              </p>
            )}
            content={hide => (
              <Modal>
                <ColorPicker onColorChosen={onColorSelected} />
                <button
                  onClick={e => {
                    e.preventDefault();
                    hide();
                  }}
                >
                  Close
                </button>
              </Modal>
            )}
          />
        </ThirdColorProvider>
        {errors.atLeastOne && (
          <p className="error">
            <span data-testid="confirm-email-error">{errors.atLeastOne}</span>
          </p>
        )}

        <p>
          <label htmlFor="save" className="hidden">
            {" "}
            post your paint{" "}
          </label>
          <input type="submit" value="save" id="save" />
        </p>

        <div>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/roundicons"
            title="Roundicons"
          >
            Roundicons
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
          <div>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </form>
      <img src="/api/pageview?pg=donate" />
    </div>
  );
};

export default GiveAwayPaint;
