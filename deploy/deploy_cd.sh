npm run build &&
npm run export &&
rsync -r deploy/nginx.cn.conf root@1.14.76.82:/data/singapore_ui/singapore_ui.nginx.conf
rsync -r out root@1.14.76.82:/data/singapore_ui
