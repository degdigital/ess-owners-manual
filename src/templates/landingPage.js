import React from 'react';

const LandingPage = ({ pageContext }) => {
  // console.log(pageContext);

  const { id, title, description, assets } = pageContext;

  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${id}&amp;size=100x100`}
        alt=""
        title=""
      />
      {assets && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(
              ({ id, title, description, url, file, internal: { type } }) => {
                const correctDescription =
                  type === 'ContentfulPdf' ? file.description : description;
                const correctLink =
                  type === 'ContentfulPdf' ? file.file.url : url;
                return (
                  <tr key={id}>
                    <td>
                      <a href={correctLink}>{title}</a>
                    </td>
                    <td>{correctDescription}</td>
                    <td>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${id}&amp;size=100x100`}
                        alt=""
                        title=""
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LandingPage;
