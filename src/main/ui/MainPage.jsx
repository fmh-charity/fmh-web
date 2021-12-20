import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import iconId1 from "../../assets/Icons/categoryIcons/iconId1.png";
import iconId2 from "../../assets/Icons/categoryIcons/iconId2.png";
import iconId3 from "../../assets/Icons/categoryIcons/iconId3.png";
import iconId4 from "../../assets/Icons/categoryIcons/iconId4.png";
import iconId5 from "../../assets/Icons/categoryIcons/iconId5.png";
import iconId6 from "../../assets/Icons/categoryIcons/iconId6.png";
import iconId7 from "../../assets/Icons/categoryIcons/iconId7.png";
import iconId8 from "../../assets/Icons/categoryIcons/iconId8.png";
import "./NewsMainWindow.css";
import NewsWindow from "../../news/ui/NewsWindow";
import StatementPage from "../../statementPage/StatementPage";
import styles from './main.module.css';
import cn from 'classnames';

function biggestToSmallest(a, b) {
  return new Date(b.publishDate) - new Date(a.publishDate);
}

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      newsList: [],
      open: false,
      expandedNews: true,
      openNews: false,
      sort: false,
      moreNews: 3,
    };
  }

  handleChangeNews = (panel) => (event, isExpanded) => {
    this.setState({ expandedNews: isExpanded ? panel : false });
  };

  handleFormatNumberToDate = (date) => {
    var d = new Date(date * 1000);
    var datestring =
      ("0" + d.getDate()).slice(-2) +
      "." +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "." +
      d.getFullYear();
    return datestring;
  };

  handleClickShowMore = () => {
    var more = this.state.moreNews + 3;
    this.setState({ moreNews: more });
  };

  componentDidMount() {
    //axios
    //  .get(BackDataService.getAllNews())
    //  //axios.get(`http://130.193.44.96:8080/fmh/news`)
    //  .then((res) => {
    //    const newsList = res.data;
    //    this.setState({ newsList });
    //  });
  }

  render() {
    const sorted = this.state.newsList.sort(biggestToSmallest);
    var size = this.state.newsList.size;
    let more = this.state.moreNews;

    const showNewsAccordionList = sorted.slice(size, more).map((s) => {
      let publishEnabledIcon;
      let icon;
      switch (s.newsCategoryId) {
        case 1:
          icon = <img alt={"test"} src={iconId1} />;
          break;
        case 2:
          icon = <img alt={"test"} src={iconId2} />;
          break;
        case 3:
          icon = <img alt={"test"} src={iconId3} />;
          break;
        case 4:
          icon = <img alt={"test"} src={iconId4} />;
          break;
        case 5:
          icon = <img alt={"test"} src={iconId5} />;
          break;
        case 6:
          icon = <img alt={"test"} src={iconId6} />;
          break;
        case 7:
          icon = <img alt={"test"} src={iconId7} />;
          break;
        case 8:
          icon = <img alt={"test"} src={iconId8} />;
          break;
        default:
          break;
      }
      let publicDate = this.handleFormatNumberToDate(s.publishDate);
      let createDate = this.handleFormatNumberToDate(s.createDate);

      if (s.publishEnabled == "false") {
        publishEnabledIcon = (
          <Typography>
            <Close /> НЕ РАЗМЕЩЕНА
          </Typography>
        );
      } else {
        publishEnabledIcon = (
          <Typography>
            <Check /> РАЗМЕЩЕНА
          </Typography>
        );
      }
      return (
        <Accordion
          expanded={this.expandedNews}
          className="accordionNews"
          onChange={this.handleChangeNews(s.createDate)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{
              marginBottom: "2px",
              boxShadow: "0px 2px 0px 0px #38c6d7",
              display: "inlineFlex",
            }}
            aria-controls="panel2bh-content">
            <ListItemIcon>{icon} </ListItemIcon>
            <Typography> {s.title} </Typography>
            <Typography
              className="typDatePublicNews"
              style={{ fontSize: "theme.typography.pxToRem(15)" }}>
              {publicDate}{" "}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="accordionDetNews">
            <Box item boxShadow={1} xs={3} className="boxNews">
              <Typography className="typFloatLeft">Дата публикации: </Typography>
              <Typography className="typFloatRight">{publicDate} </Typography>
            </Box>

            <Box item boxShadow={1} xs={3} className="boxNews">
              <Typography className="typFloatLeft">Дата создания: </Typography>
              <Typography className="typFloatRight">{createDate}</Typography>
            </Box>
            <Box item boxShadow={1} xs={3} className="boxNews">
              <Typography className="typFloatLeft">Автор:</Typography>
              <Typography className="typFloatRight">{s.creatorName}</Typography>
            </Box>
            <Box item boxShadow={1} xs={3} className="boxWithIconNews">
              <Typography className="typTextNews">{publishEnabledIcon}</Typography>
            </Box>
            <div className="typTextNews">
              <Typography>{s.description}</Typography>
            </div>
          </AccordionDetails>
        </Accordion>
      );
    });

    return (
      <React.Fragment>
          <div className="divNews">
            <Paper className="divPaperNews" elevation={1}>
              <Typography variant="h5" component="h3" className="titleNews">
                Новости
              </Typography>
              <div>{showNewsAccordionList}</div>
              <Button color="primary" className="showMore" onClick={this.handleClickShowMore}>
                ПОКАЗАТЬ ЕЩЁ
              </Button>
            </Paper>
          </div>
          <StatementPage rollup={styles.icon_rollup} filter={styles.icon_filter}/>

      </React.Fragment>

    );
  }
}

export default MainPage;
