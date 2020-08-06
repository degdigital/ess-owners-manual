const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulLandingPage(filter: { node_locale: { eq: "en-US" } }) {
          edges {
            node {
              id
              slug
              title
              description
              assets {
                ... on ContentfulLink {
                  id
                  url
                  title
                  description
                  internal {
                    type
                  }
                }
                ... on ContentfulPdf {
                  id
                  title
                  file {
                    file {
                      url
                    }
                    description
                    id
                  }
                  internal {
                    type
                  }
                }
              }
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        console.log('Error retrieving contentful data', result.errors);
      }
      // Resolve the paths to our template
      const landingPageTemplate = path.resolve(
        './src/templates/landingPage.js'
      );
      // Then for each result we create a page.
      result.data.allContentfulLandingPage.edges.forEach(edge => {
        createPage({
          path: `/${edge.node.slug}/`,
          component: slash(landingPageTemplate),
          context: {
            assets: edge.node.assets,
            title: edge.node.title,
            description: edge.node.description,
            slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
    })
    .catch(error => {
      console.log('Error retrieving contentful data', error);
    });
};
