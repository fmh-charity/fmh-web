import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import iconId1 from "../../assets/Icons/categoryIcons/iconId1.png";
import iconId2 from "../../assets/Icons/categoryIcons/iconId2.png";
import iconId3 from "../../assets/Icons/categoryIcons/iconId3.png";
import iconId4 from "../../assets/Icons/categoryIcons/iconId4.png";
import iconId5 from "../../assets/Icons/categoryIcons/iconId5.png";
import iconId6 from "../../assets/Icons/categoryIcons/iconId6.png";
import iconId7 from "../../assets/Icons/categoryIcons/iconId7.png";
import iconId8 from "../../assets/Icons/categoryIcons/iconId8.png";
import addIcon from "../../assets/Icons/add.png";
import ReplayIcon from "@material-ui/icons/Replay";
import deleteIcon from "../../assets/Icons/delete.png";
import filterIcon from "../../assets/Icons/filter.png";
import reduxIcon from "../../assets/Icons/redux.png";
import sortIcon from "../../assets/Icons/sort.png";

import { Filter } from './Filter';
import { CreateForm } from '../edit/ui/CreateForm';

import useRepository from '../repository';

import News from "./News";
import "./NewsWindow.css";

const AccordionItem = ({ 
  record, 
  icon,
  publicDate, 
  publicTime,
  createDate, 
  publishEnabledIcon,
  expandedNews,
  handleChangeNews,
  deleteRecord,
  handleClickOpenDialogRedux
}) => {
  return (
    <Accordion
      expanded={expandedNews}
      className="boxAccordion"
      onChange={handleChangeNews(record.createDate)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2bh-content"
        id="panel2bh-header">
        <Typography
          className="accordionTypography"
          style={{
            fontSize: "theme.typography.pxToRem(15)",
          }}>
          <ListItemIcon>{icon}</ListItemIcon>
          {record.title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails className="detailsAccordion">
        <Box item boxShadow={1} xs={3} className="boxCreate">
          <Typography className="typFloatLeft">Дата публикации: </Typography>
          <Typography className="typFloatRight">{publicDate}</Typography>
        </Box>

        <Box item boxShadow={1} xs={3} className="boxCreate">
          <Typography className="typFloatLeft">Дата создания: </Typography>
          <Typography className="typFloatRight">{createDate}</Typography>
        </Box>
        <Box item boxShadow={1} xs={3} className="boxCreate">
          <Typography className="typFloatLeft">Автор:</Typography>
          <Typography className="typFloatRight">{record.creatorName}</Typography>
        </Box>
        <Box item boxShadow={1} xs={3} className="boxPublic">
          <Typography className="typFloatLeft">{publishEnabledIcon}</Typography>
          <Typography className="typButtons">
            <Button color="black" className="typButtonsLeft" onClick={deleteRecord(record.id)}>
              <img src={deleteIcon} alt={"test"} />
            </Button>
            {/* showDialogUpdate */}
            <Button
              className="typButtons"
              color="black"
              onClick={() =>
                handleClickOpenDialogRedux(
                  record.id,
                  record.description,
                  record.title,
                  publicDate,
                  publicTime,
                  record.newsCategoryId,
                  record.publishEnabled,
                )
              }>
              <img src={reduxIcon} alt={"test"} />
            </Button>
          </Typography>
        </Box>
        <div className="typText">
          <Typography>{record.description}</Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const NewsWindow = () => {
  const [state, setState] = useState({
    list: []
  });

  const [repo, methods] = useRepository();

  const shown = [];

  const handleClickOpenSort = () => {
    if (state.sort === false) {
      setState({ sort: true });
    } else setState({ sort: false });
  };
  const handleClickOpenFilter = () => {
    if (state.filter === false) {
      setState({ openFilter: true });
    } else setState({ openFilter: false });
  };
  const handleOpenCreate = () => {
    setState({ openCreate: true });
  };
  const handleFormatNumberToTime = (date) => {
    return new Date(date * 1000).toLocaleTimeString();
  };

  const handleFormatNumberToDate = (date) => {
    const d = new Date(date * 1000);
    var date =
      ("0" + d.getDate()).slice(-2) +
      "." +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "." +
      d.getFullYear();
    return date;
  };
  const handleChangeNews = (panel) => (event, isExpanded) => {
    setState({ expandedNews: isExpanded ? panel : false });
  };
 const handleClickOpenDialogRedux = (
    id,
    report,
    title,
    publishDate,
    publishTime,
    newsCategoryId,
    publishEnabled,
  ) => {
    var dateString =
      publishDate.substr(6, 4) + "-" + publishDate.substr(3, 2) + "-" + publishDate.substr(0, 2);

    if (this.state.openDialogRedux === false) {
      setState({ openDialogRedux: true });
      setState({ reduxIdNews: id });
      setState({ reduxReportNews: report });
      setState({ reduxTitleNews: title });
      setState({ reduxCategoryId: newsCategoryId });
      setState({ reduxPublicDate: dateString });
      setState({ reduxIdNewsEvent: newsCategoryId });
      setState({ reduxPublishTime: publishTime });
      setState({ reduxPublishEnabled: publishEnabled });
    }
  };

  const deleteRecord = () => {
    console.log('delete');
  }

  return state.list ? (
    <div className="divNews">
      <Paper className="paperDivNews" elevation={1}>
        <Typography variant="h5" component="h3" className="mainTitle">
          Новости
          <div className="typButtonsRight">
            <Button color="primary" onClick={methods.getNews}>
              <ReplayIcon color="action" />
            </Button>

            <Button color="primary" onClick={handleClickOpenSort}>
              <img src={sortIcon} alt={"test"} />
            </Button>
            <Button color="primary" onClick={handleClickOpenFilter}>
              <img src={filterIcon} alt={"test"} />
            </Button>
            <Filter />
            <Button color="primary" onClick={handleOpenCreate}>
              <img src={addIcon} alt={"test"} />
            </Button>
            <CreateForm />
          </div>
        </Typography>
        <div>{state.list.map((record) => {
          let publishEnabledIcon;

          let icon;
          switch (record.newsCategoryId) {
            case 1:
              icon = <img src={iconId1} alt={"test"} />;
              break;
            case 2:
              icon = <img src={iconId2} alt={"test"} />;
              break;
            case 3:
              icon = <img src={iconId3} alt={"test"} />;
              break;
            case 4:
              icon = <img src={iconId4} alt={"test"} />;
              break;
            case 5:
              icon = <img src={iconId5} alt={"test"} />;
              break;
            case 6:
              icon = <img src={iconId6} alt={"test"} />;
              break;
            case 7:
              icon = <img src={iconId7} alt={"test"} />;
              break;
            case 8:
              icon = <img src={iconId8} alt={"test"} />;
              break;
            default:
              break;
          }

          let publicDate = handleFormatNumberToDate(record.publishDate);
          let createDate = handleFormatNumberToDate(record.createDate);
          let publicTime = handleFormatNumberToTime(record.publishDate);

          if (record.publishEnabled === "false") {
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
          return <AccordionItem 
            record={record} 
            icon={icon}
            publicDate={publicDate}
            publicTime={publicTime} 
            createDate={createDate}
            publishEnabledIcon={publishEnabledIcon}
            handleClickOpenDialogRedux={handleClickOpenDialogRedux}
            deleteRecord={methods.deleteRecord}
            handleChangeNews={handleChangeNews}
          />
        })}</div>
      </Paper>
    </div>
  ) : (
    <News />
  );
};

export default NewsWindow;
