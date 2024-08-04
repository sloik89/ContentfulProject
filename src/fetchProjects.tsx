import { useEffect, useState } from "react";
import * as contentful from "contentful";
const client = contentful.createClient({
  space: import.meta.env.VITE_API_KEY,
  environment: "master",
  accessToken: import.meta.env.VITE_API_TOKEN,
});
// client.getEntries({ content_type: "projects" }).then((response) => {
//   console.log(response);
// });
type CategoryEntrySkeleton = {
  contentTypeId: "category";
  fields: {
    categoryName: contentful.EntryFieldTypes.Text;
  };
};
type typeProjects = {
  imgUrl: string;
  url: string;
  title: string;
};
type ProductEntrySkeleton = {
  contentTypeId: "projects";
  fields: {
    productName: contentful.EntryFieldTypes.Text;
    image: contentful.EntryFieldTypes.AssetLink;
    price: contentful.EntryFieldTypes.Number;
    categories: contentful.EntryFieldTypes.Array<
      contentful.EntryFieldTypes.EntryLink<CategoryEntrySkeleton>
    >;
    location: contentful.EntryFieldTypes.Location;
  };
};
export const useFetchProject = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<typeProjects[]>([]);
  const getData = async () => {
    try {
      const res = await client.getEntries<ProductEntrySkeleton>({
        content_type: "projects",
      });
      setLoading(false);
      console.log(res);
      const data = res.items.map((item: any) => {
        const {
          url,
          title,
          image: {
            fields: {
              file: { url: imgUrl },
            },
          },
        } = item.fields;

        return { url, title, imgUrl };
      });
      setProjects(data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};
