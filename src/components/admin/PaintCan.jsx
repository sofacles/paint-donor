import React from 'react';

export const PaintCan = ({ paintUnit, onDelete }) => {
  const imgStyle = {
    height: '90%',
  };

  const rgbStyle = {
    backgroundColor: `#${paintUnit.rgb}`,
    height: '30px',
    width: '160px',
  };

  const deletePaint = () => {
    fetch(`/api/admin/PaintCan?id=${paintUnit._id}`, { method: 'DELETE' })
      .then((x) => {
        return x.text();
      })
      .then((t) => {
        let resp = JSON.parse(t);
        if (resp.data.result === 'delete succeeded') {
          onDelete(paintUnit._id);
        }
      });
  };

  return (
    <tr>
      <td>{paintUnit.name}</td>

      <td style={imgStyle}>
        {paintUnit.imageName ? (
          <img
            alt="paint color"
            style={imgStyle}
            src={`uploads/resized/${paintUnit.imageName}`}
          />
        ) : (
          <div style={rgbStyle} />
        )}
      </td>
      <td>
        <button onClick={deletePaint}>delete</button>
      </td>
    </tr>
  );
};
