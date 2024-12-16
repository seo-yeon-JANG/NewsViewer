import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    console.log(query);
    return axios.get(
      `https://newsapi.org/v2/everything?q=Korea&language=ko${query}&apiKey=038499eeea364130bf98543aac6b2bb3`,
    );
  }, [category]);

  if (loading) {
    return <NewsListBlock>로딩중...</NewsListBlock>;
  }
  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListBlock>에러발생!</NewsListBlock>;
  }

  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};
export default NewsList;
