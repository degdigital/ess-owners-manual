import React from 'react';

const LandingPage = ({ pageContext }) => {
  const baseUrl = 'https://thirsty-shannon-179bfb.netlify.app';
  const { slug, title, description, assets } = pageContext;
  const urlParams = new URLSearchParams(window.location.search);
  const qrIsShown = urlParams.get('qr') !== null;

  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {qrIsShown && (
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${baseUrl}/${slug}&amp;size=100x100`}
          alt={title}
          title={description}
        />
      )}
      {assets && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              {qrIsShown && <th>QR</th>}
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
                    {qrIsShown && (
                      <td>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?data=${correctLink}&amp;size=100x100`}
                          alt={title}
                          title={correctDescription}
                        />
                      </td>
                    )}
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
