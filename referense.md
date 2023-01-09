# js-streaming-mp4
js-streaming-mp4 
https://alnova2.tistory.com/1166<hr/>
https://www.mplsoft.co.kr/entry/nginx-CentOS-7%EC%97%90-nginx-%EC%B5%9C%EC%8B%A0-%EB%B2%84%EC%A0%84%EA%B3%BC-nginx-vod-%EB%AA%A8%EB%93%88-%EA%B5%AC%EC%84%B1 <hr/>
https://lts0606.tistory.com/510<hr/>
https://wikidocs.net/149970<hr/>
https://frontdev.tistory.com/entry/ffmpeg%EB%A1%9C-hls-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%98%B5%EC%85%98%EC%A0%95%EB%A6%AC <hr/>
    ffmpeg ../fff.mp4 -filter_complex "select='gt(scene,0.3)',metadata=print:file=time.txt" -vsync vfr img%03d.png <hr/>
    ffmpeg -i ../fff.mp4 -b:v 1M -g 60 -hls_time 2 -hls_list_size 0 -hls_segment_size 500000 outman.m3u8 <hr/>
