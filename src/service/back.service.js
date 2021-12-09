import http from "./http-common";


class BackDataService {

  getAllNews() {
   // return http.get("/news");
   return  'https://avdeevaelena.github.io/json/newsUpdate2.json';
  }

  updateNews (idNews, title,newsCategoryId, text, longFormatDatePublic, isShow,longFormatDateCreate ){
    var body = {
      createDate: longFormatDateCreate,
      creatorId: 'null',
      creatorName: 'null',
      description: text,
      id: idNews,
      newsCategoryId: newsCategoryId,
      publishDate: longFormatDatePublic,
      publishEnabled: isShow,
      title: title,
  };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    };
    return fetch(``, body)
     // .then(handleResponse)
      .then(user => {
  
        return user;
      });     
  }

  createNews (title,eventId, text, isShow, datePublic, dateCreate){
    var body = {
      createDate: dateCreate,
      creatorId: 'null',
      creatorName: 'null',
      description: text,
      id: 'null',
      newsCategoryId: eventId,
      publishDate: datePublic,
      publishEnabled: isShow,
      title: title,
  };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    };
    return fetch(``, body)
     // .then(handleResponse)
      .then(user => {
  
        return user;
      });     
  }

}

export default new BackDataService();