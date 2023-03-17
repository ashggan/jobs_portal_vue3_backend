export type Job = {
  id: number;
  category_id: number;
  latitude: number;
  location: Location;
  category: number;
  salary_max: number;
  created: Date;
  salary_is_predicted: string;
  salary_min: number;
  description: string;
  contract_type: string;
  redirect_url: string;
  company: string;
  title: string;
  user_id: number;
};
