<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Validator;


class SmartController extends Controller
{
    function index()
    {
        $images = Image::all();
        return view('home');
    }

    function sendData()
    {
        $codedImages = [];
        $images = Image::all(); 
        foreach($images as $image)
        {
            $codedImages[] = json_encode($image);
        }
        return json_encode($codedImages);
    }

    function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->passes()) {
            $input['image'] = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $input['image']);
            $data = ['name' => $request->name,'image'=>$input['image']];
            Image::create($data);
            return "image uploaded successfully!";
        }
        else
        {
            return "we can't upload this image";  
        }
    }

    function delete(Request $request)
    {
        $images = Image::find($request->id);
        if($images->delete())
        {
            return "image deleted" ;
        }
        else
        {
            return "we can't delete this image" ;
        }
    }

    
}
