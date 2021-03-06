import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { CodeGroundPopulated } from '../../../../src/models/CodeGround';
import {
  CodeBranch,
  Heart,
  ThumbsUp,
  Comments,
  TrashAlt,
} from '@styled-icons/fa-solid';
import { WrapperButton } from '../StyledComponents/IconsButtons';
import { Small } from '../StyledComponents/FormComponents';
import {
  deleteGround,
  dislikeCodeGround,
  forkCodeGround,
  likeCodeGround,
} from '../../services/codeground';
import { addToFavourites, removeFromFavourites } from '../../services/users';
import { UserDocument } from '../../../../src/models/User';

const ResultFieldContainer = styled.article`
  display: flex;
  flex-flow: column;
  width: 25vw;
  background: #2b2d3b;
  margin: 1em;
  padding: 0.3em;
  border: 2px solid #f4f6fc;
  border-radius: 0.4em;
  box-shadow: 0.7em 0.7em 0.5em 0em #131522;

  @media (max-width: 768px) {
    flex-grow: 1;
    margin: 3em;
    font-size: 2em;
  }
`;

const ThumbnailWrapper = styled.div`
  overflow: hidden;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1 0 auto;
  background: #131522;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  padding: 0.5em 0em;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.2em;
  justify-content: center;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  background: white;
  /* overflow: hidden; */

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const IconWrapper = styled(WrapperButton)`
  font-size: 0.7rem;
  margin-top: 0em;
  background: #131522;
  border-radius: 0.2em;
  padding: 0.5em;
  margin: 0em 0.2em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Span = styled.span`
  margin-left: 0.5em;
`;

const Br = styled.br`
  margin: 0;
`;

const H4 = styled.h4`
  color: lightblue;
  &:hover {
    color: #58b487;
    transition: 1s;
  }
`;

const LinkSpan = styled(Link)`
  color: lightblue;
  &:hover {
    color: #58b487;
    transition: 1s;
  }
`;

const StyledThumbsUp = styled(ThumbsUp)<{ liked: boolean }>`
  ${(props) => (props.liked ? 'color:#3f9c3f' : 'color: inherit')}
`;

const StyledHeart = styled(Heart)<{ favourited: boolean }>`
  ${(props) => (props.favourited ? 'color:#e23131' : 'color: inherit')}
`;

export interface GroundCardProps extends RouteComponentProps {
  codeGround: CodeGroundPopulated;
  user: UserDocument | null;
  userOwnsGround: boolean;
  liked: boolean;
  favourited: boolean;
}

const GroundCard: React.FC<GroundCardProps> = (props) => {
  const { codeGround, user, userOwnsGround } = props;
  const [like, setLike] = useState(props.liked);
  const [favourite, setFavourite] = useState(props.favourited);
  const [deleted, setDeleted] = useState(false);

  const srcDoc = `
  <html>
    <head>
      <style>${codeGround.css}</style>
    </head>
    <body>${codeGround.html}</body>
    <script>${codeGround.js}</script>
  </html>
  `;

  const handleLike = () => {
    if (!user) return;
    if (like) {
      setLike(false);
      dislikeCodeGround(codeGround._id, user!._id)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
    } else {
      setLike(true);
      likeCodeGround(codeGround._id, user!._id)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
    }
  };

  const calcNumberOfLikes = () => {
    const numberOfLikesFromProps = codeGround.likes.length;
    if (props.liked) {
      return !like ? numberOfLikesFromProps - 1 : numberOfLikesFromProps;
    } else {
      return like ? numberOfLikesFromProps + 1 : numberOfLikesFromProps;
    }
  };

  const handleFavourite = () => {
    if (!user) return;
    if (favourite) {
      setFavourite(false);
      removeFromFavourites(user!._id, codeGround._id)
        .then((resp) => {})
        .catch((err) => console.log(err));
    } else {
      setFavourite(true);
      addToFavourites(user!._id, codeGround._id)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = () => {
    if (!user) return;
    deleteGround(codeGround._id)
      .then(() => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  };

  const handleFork = () => {
    if (!user) return;
    forkCodeGround(codeGround, user!._id)
      .then((ground) => {
        console.log(ground);
        console.log(props.history);
        props.history.push(`/code-ground/${ground._id}`);
      })
      .catch((err) => console.log(err));
  };

  const renderInteractionButtons = () => {
    return (
      <>
        <IconWrapper onClick={handleFavourite}>
          <StyledHeart size="1.2em" favourited={favourite} />
        </IconWrapper>

        <IconWrapper onClick={handleFork}>
          <CodeBranch size="1.2em" />
        </IconWrapper>
      </>
    );
  };

  const renderEditOptions = () => {
    return (
      <>
        <IconWrapper onClick={handleDelete}>
          <TrashAlt size="1.2em" />
        </IconWrapper>
      </>
    );
  };

  const displayAuthors = () => {
    return codeGround.user.username !== codeGround.creator.username ? (
      <>
        <Small>
          by:{' '}
          <LinkSpan to={`/profile/${codeGround.user._id}`}>
            {codeGround.user.username}
          </LinkSpan>
        </Small>
        <Small>
          originally by:{' '}
          <LinkSpan to={`/profile/${codeGround.creator._id}`}>
            {codeGround.creator.username}
          </LinkSpan>
        </Small>
      </>
    ) : (
      <>
        <Small>
          by:{' '}
          <LinkSpan to={`/profile/${codeGround.user._id}`}>
            {' '}
            {codeGround.user.username}
          </LinkSpan>
        </Small>
        <Br />
        <Small></Small>
      </>
    );
  };

  if (deleted) return null;

  return (
    <ResultFieldContainer>
      <DetailsWrapper>
        <Link to={`/code-ground/${codeGround._id}`}>
          <H4>{codeGround.title}</H4>{' '}
        </Link>
        {displayAuthors()}
      </DetailsWrapper>

      <ThumbnailWrapper>
        <StyledIframe
          loading="lazy"
          title={codeGround.title}
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          frameBorder="0"
        ></StyledIframe>
      </ThumbnailWrapper>

      <OptionsWrapper>
        <IconWrapper onClick={handleLike}>
          <StyledThumbsUp size="1.2em" liked={like} />
          <Span>{calcNumberOfLikes()}</Span>
        </IconWrapper>

        {!user || !userOwnsGround ? renderInteractionButtons() : null}
        {userOwnsGround ? renderEditOptions() : null}

        <IconWrapper>
          <Comments size={'1.2em'} />
          <Span> {codeGround.comments.length}</Span>
        </IconWrapper>
      </OptionsWrapper>
    </ResultFieldContainer>
  );
};

export default GroundCard;
