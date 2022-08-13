import axios from "axios";
import { API_URL } from "../constants";

export function getStickers() {
  return (
    axios
      .get(API_URL)
      .then(resp => resp.data)
  )
}

export function createSticker(item) {
  return fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

export function updateSticker(item) {
  return fetch(API_URL + "/" + item.id, {
    method: "PUT",
    body: JSON.stringify(item),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

export function deleteSticker(id) {
  return fetch(API_URL + "/" + id, {
    method: "DELETE",
  }).then((res) => res.json());
}