import axios from 'axios';
import config from './../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getDonnees = async () => {
    return axios.get(`${DOMAIN}/api/donnees`);
  };

export const getDonneesOne = async (id) => {
    return axios.get(`${DOMAIN}/api/donnees/one?id_donnee=${id}`);
  };

export const getDonneesType = async (id) => {
    return axios.get(`${DOMAIN}/api/donnees/type_one?id_type=${id}`);
  };