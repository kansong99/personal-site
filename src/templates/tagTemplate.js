import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
   return (
    <Layout>
      <div>Tags</div>
    </Layout>
  );
};

export default Tags;