import React from 'react';
import Layout from '../components/layout';

const LandingPage = ({ pageContext }) => {
  const baseUrl = 'https://thirsty-shannon-179bfb.netlify.app';
  const { slug, title, description, assets } = pageContext;
  let qrIsShown = false;
  if (typeof window !== `undefined`) {
    const urlParams = new URLSearchParams(window.location.search);
    qrIsShown = urlParams.get('qr') !== null;
  }

  return (
    <Layout>
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
                      {correctDescription && <p>{correctDescription}</p>}
                    </td>
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
    </Layout>
  );
};

export default LandingPage;
