import { Injectable } from '@angular/core';
import { HttpService } from './HttpService';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FileObj } from '../interfaces/FileObj';
import { environment } from '../../environments/environment';
import { Utils } from './Utils';
import { Helper } from './Helper';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    api = environment.fileServerUrl;

    // 根据文件后缀获取文件类型
    private static getFileType(path: string): string {
        return path.substring(path.lastIndexOf('.') + 1);
    }

    constructor(public http: HttpService, public helper: Helper) {
    }

    /**
     * 根据ids(文件数组)获取文件信息
     */
    getFileInfoByIds(ids: string[]): Observable<FileObj[]> {
        if (!ids || ids.length === 0) {
            return of([]);
        }
        return this.http.get(this.api + '/getByIds', {ids}, {useDefaultApi: false}).pipe(
            map(res => {
                if (!res.success) {
                    this.helper.alert(res.msg);
                    return [];
                } else {
                    for (const fileObj of res.data) {
                        fileObj.origPath = this.api + fileObj.origPath;
                        fileObj.thumbPath = this.api + fileObj.thumbPath;
                    }
                    return res.data;
                }
            })
        );
    }

    /**
     * 根据文件id获取文件信息
     */
    getFileInfoById(id: string): Observable<FileObj> {
        if (!id) {
            return of({});
        }
        return this.getFileInfoByIds([id]).pipe(
            map(res => res[0] || {})
        );
    }

    /**
     * 根据base64(字符串)批量上传图片
     * @param fileObjList 数组中的对象必须包含bse64属性
     */
    uploadMultiByBase64(fileObjList: FileObj[]): Observable<FileObj[]> {
        if (!fileObjList || fileObjList.length === 0) {
            return of([]);
        }
        return Observable.create(observer => {
            this.http.post(this.api + '/appUpload?directory=ionic2_tabs', fileObjList, {useDefaultApi: false}).subscribe(result => {
                if (!result.success) {
                    this.helper.alert(result.msg);
                    observer.error(false);
                } else {
                    for (const fileObj of result.data) {
                        fileObj.origPath = this.api + fileObj.origPath;
                        fileObj.thumbPath = this.api + fileObj.thumbPath;
                    }
                    observer.next(result.data);
                }
            });
        });
    }

    /**
     * 根据base64(字符串)上传单张图片
     * @param fileObj 对象必须包含origPath属性
     */
    uploadByBase64(fileObj: FileObj): Observable<FileObj> {
        if (!fileObj.base64) {
            return of({});
        }
        return this.uploadMultiByBase64([fileObj]).pipe(
            map(res => res[0] || {})
        );
    }

    /**
     *  根据filePath(文件路径)批量上传图片
     * @param fileObjList 数组中的对象必须包含origPath属性
     */
    uploadMultiByFilePath(fileObjList: FileObj[]): Observable<FileObj[]> {
        if (fileObjList.length === 0) {
            return of([]);
        }
        return Observable.create((observer) => {
            this.helper.showLoading();
            const files = [];
            for (const fileObj of fileObjList) {
                Utils.convertImgToBase64(fileObj.origPath, base64 => {
                    files.push({
                        'base64': base64,
                        'type': FileService.getFileType(fileObj.origPath),
                        'parameter': fileObj.parameter
                    });
                    if (files.length === fileObjList.length) {
                        this.uploadMultiByBase64(files).subscribe(res => {
                            observer.next(res);
                            this.helper.hideLoading();
                        });
                    }
                });
            }
        });
    }

    /**
     * 根据filePath(文件路径)上传单张图片
     * @param fileObj 对象必须包含origPath属性
     */
    uploadByFilePath(fileObj: FileObj): Observable<FileObj> {
        if (!fileObj.origPath) {
            return of({});
        }
        return this.uploadMultiByFilePath([fileObj]).pipe(
            map(res => res[0] || {})
        );
    }

}
