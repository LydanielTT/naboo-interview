export type City = {
  nom: string;
  code: string;
  _score: number;
  departement: {
    code: string;
    nom: string;
  };
};
